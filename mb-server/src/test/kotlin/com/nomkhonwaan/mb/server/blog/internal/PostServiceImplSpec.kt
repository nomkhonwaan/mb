package com.nomkhonwaan.mb.server.blog.internal

import com.github.slugify.Slugify
import com.nomkhonwaan.mb.server.auth.User
import com.nomkhonwaan.mb.server.blog.Category
import com.nomkhonwaan.mb.server.blog.Post
import com.nomkhonwaan.mb.server.blog.PostRepository
import com.nomkhonwaan.mb.server.blog.Status
import com.nomkhonwaan.mb.server.fixture.categories
import com.nomkhonwaan.mb.server.fixture.filterBy
import com.nomkhonwaan.mb.server.fixture.posts
import com.nomkhonwaan.mb.server.fixture.users
import org.bson.types.ObjectId
import org.commonmark.node.Node
import org.commonmark.parser.Parser
import org.commonmark.renderer.html.HtmlRenderer
import org.junit.jupiter.api.Assertions
import org.mockito.ArgumentCaptor
import org.mockito.Mockito.*
import org.spekframework.spek2.Spek
import org.spekframework.spek2.style.specification.describe
import org.springframework.data.domain.Sort
import java.time.ZonedDateTime

object PostServiceImplSpec : Spek({
    val postRepository: PostRepository = mock(PostRepository::class.java)
    val postService = PostServiceImpl(postRepository)

    afterEachTest {
        reset(postRepository)
    }

    describe("findAll()") {
        context("find all by status") {
            it("should return a list of published posts") {
                // Given
                val status = Status.PUBLISHED
                val sort: Sort = Sort.by(Sort.Direction.DESC, "publishedAt")
                val expectedResult: List<Post?> = posts.filterBy(status)
                `when`(postRepository.findAllByStatus(status, sort)).thenReturn(expectedResult)

                // When
                val result: List<Post?> = postService.findAll(status)

                // Then
                Assertions.assertEquals(result, expectedResult)
            }

            it("should return a list of draft posts") {
                // Given
                val status = Status.DRAFT
                val expectedResult: List<Post?> = posts.filterBy(status)
                `when`(postRepository.findAllByStatus(status)).thenReturn(expectedResult)

                // When
                val result: List<Post?> = postService.findAll(status)

                // Then
                Assertions.assertEquals(result, expectedResult)
            }
        }

        context("find all by author and status") {
            it("should return a list of published posts that belong to the author") {
                // Given
                val author: User = users[0]
                val status = Status.PUBLISHED
                val sort: Sort = Sort.by(Sort.Direction.DESC, "publishedAt")
                val expectedResult: List<Post?> = posts.filterBy(author).filterBy(status)
                `when`(postRepository.findAllByAuthorIdAndStatus(author.id, status, sort)).thenReturn(expectedResult)

                // When
                val result: List<Post?>? = postService.findAll(author, status)

                // Then
                Assertions.assertEquals(result, expectedResult)
            }

            it("should return a list of draft posts that belong to the author") {
                // Given
                val author: User = users[1]
                val status = Status.DRAFT
                val expectedResult: List<Post?> = posts.filterBy(author).filterBy(status)
                `when`(postRepository.findAllByAuthorIdAndStatus(author.id, status)).thenReturn(expectedResult)

                // When
                val result: List<Post?>? = postService.findAll(author, status)

                // Then
                Assertions.assertEquals(result, expectedResult)
            }
        }

        context("find all by category and status") {
            it("should return a list of published posts that belong to the category") {
                // Given
                val category: Category = categories[0]
                val status = Status.PUBLISHED
                val sort: Sort = Sort.by(Sort.Direction.DESC, "publishedAt")
                val expectedResult: List<Post?> = posts.filterBy(category).filterBy(status)
                `when`(postRepository.findAllByCategoryIdAndStatus(category.id, status, sort)).thenReturn(expectedResult)

                // When
                val result: List<Post?>? = postService.findAll(category, status)

                // Then
                Assertions.assertEquals(result, expectedResult)
            }

            it("should return a list of draft posts that belong to the category") {
                // Given
                val category: Category = categories[1]
                val status = Status.DRAFT
                val expectedResult: List<Post?> = posts.filterBy(category).filterBy(status)
                `when`(postRepository.findAllByCategoryIdAndStatus(category.id, status)).thenReturn(expectedResult)

                // When
                val result: List<Post?>? = postService.findAll(category, status)

                // Then
                Assertions.assertEquals(result, expectedResult)
            }
        }
    }

    describe("create()") {
        it("should create a new post filterBy DRAFT status") {
            // Given
            val author: User = users[0]
            val postId: String = ObjectId.get().toHexString()
            val mockResult = Post(
                    id = postId,
                    title = "",
                    slug = "-$postId",
                    status = Status.DRAFT,
                    author = author,
                    categories = listOf()
            )
            val captor: ArgumentCaptor<Post> = ArgumentCaptor.forClass(Post::class.java)
            `when`<Post>(postRepository.save(any())).thenReturn(mockResult)

            // When
            postService.create(author)

            // Then
            verify(postRepository, times(2)).save(captor.capture())

            Assertions.assertNotEquals(captor.allValues[1].id, "")
            Assertions.assertEquals(captor.allValues[1].slug, "-${captor.allValues[1].id}")
            Assertions.assertEquals(captor.allValues[1].status, Status.DRAFT)
            Assertions.assertEquals(captor.allValues[1].author, author)
            Assertions.assertEquals(captor.allValues[1].categories, listOf<Category>())
        }
    }

    describe("updateTitle()") {
        it("should update a title of the post and its slug") {
            // Given
            val post: Post = posts[0]!!
            val title = "Foo"
            val expectedResult: Post = posts[0]!!.copy(title = title, slug = "${Slugify().slugify(title)}-${post.id}")
            `when`(postRepository.save(expectedResult)).thenReturn(expectedResult)

            // When
            val result: Post = postService.updateTitle(post, title)

            // Then
            Assertions.assertEquals(result, expectedResult)
        }
    }

    describe("updateStatus()") {
        context("from DRAFT to PUBLISHED") {
            it("should update a status of the post and its publishedAt property") {
                // Given
                val status = Status.PUBLISHED
                val post: Post = posts.filterBy(Status.DRAFT)[0]!!
                val mockResult: Post = post.copy(status = status, publishedAt = ZonedDateTime.now())
                val captor: ArgumentCaptor<Post> = ArgumentCaptor.forClass(Post::class.java)
                `when`<Post>(postRepository.save(any())).thenReturn(mockResult)

                // When
                postService.updateStatus(post, status)

                // Then
                verify(postRepository).save(captor.capture())

                Assertions.assertEquals(captor.value.status, status)
                Assertions.assertNotNull(captor.value.publishedAt)
            }
        }

        context("from PUBLISHED to DRAFT") {
            it("should update a status of the post") {
                // Given
                val status = Status.DRAFT
                val post: Post = posts.filterBy(Status.PUBLISHED)[0]!!
                val expectedResult: Post = post.copy(status = status)
                `when`(postRepository.save(expectedResult)).thenReturn(expectedResult)

                // When
                val result: Post = postService.updateStatus(post, status)

                // Then
                Assertions.assertEquals(result, expectedResult)
            }
        }
    }

    describe("updateContent()") {
        it("should update a content of the post (markdown) and its HTML") {
            // Given
            val post: Post = posts[0]!!
            val markdown = """
                # Lorem Ipsum

                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Sed tristique sit amet massa id imperdiet. Duis sit amet condimentum sapien, in consectetur nibh.

                - Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                - Vestibulum vehicula sapien nec arcu rhoncus consectetur.

                > Nam egestas enim in vehicula aliquet.

                ---

                ## Interdum

                Interdum et malesuada fames ac ante ipsum primis in faucibus.

                ```bash
                $ echo 'Nam tincidunt consequat orci.'
                ```

                Maecenas nec luctus orci. Sed et lacus ac risus laoreet pellentesque.
                Fusce ut massa nunc. Praesent quis dolor interdum, consequat elit ut, facilisis ipsum.
            """.trimIndent()
            val parser: Parser = Parser.builder().build()
            val document: Node = parser.parse(markdown)
            val renderer: HtmlRenderer = HtmlRenderer.builder().build()
            val html = renderer.render(document)
            val expectedResult: Post = posts[0]!!.copy(markdown = markdown, html = html)
            `when`(postRepository.save(expectedResult)).thenReturn(expectedResult)

            // When
            val result: Post = postService.updateContent(post, markdown)

            // Then
            Assertions.assertEquals(result, expectedResult)
        }
    }
})
