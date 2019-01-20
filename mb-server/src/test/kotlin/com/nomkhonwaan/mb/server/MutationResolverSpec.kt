package com.nomkhonwaan.mb.server

import com.nomkhonwaan.mb.server.auth.User
import com.nomkhonwaan.mb.server.blog.*
import com.nomkhonwaan.mb.server.fixture.posts
import com.nomkhonwaan.mb.server.fixture.users
import org.bson.types.ObjectId
import org.junit.jupiter.api.Assertions
import org.mockito.Mockito.`when`
import org.mockito.Mockito.mock
import org.spekframework.spek2.Spek
import org.spekframework.spek2.style.specification.describe
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.context.SecurityContextHolder

object MutationResolverSpec : Spek({
    val postService: PostService = mock(PostService::class.java)
    val mutationResolver = MutationResolver(postService)

    beforeEachTest {
        SecurityContextHolder.getContext().authentication =
                UsernamePasswordAuthenticationToken(users[0], null, listOf())
    }

    afterEachTest {
        SecurityContextHolder.getContext().authentication =
                UsernamePasswordAuthenticationToken("anonymousUser", null, listOf())
    }

    describe("createPost()") {
        it("should call postService.create()") {
            // Given
            val author: User = users[0]
            val expectedResult = Post(
                    id = ObjectId.get().toHexString(),
                    status = Status.DRAFT,
                    author = author,
                    categories = listOf()
            )
            `when`(postService.create(author)).thenReturn(expectedResult)

            // When
            val result: Post = mutationResolver.createPost()

            // Then
            Assertions.assertEquals(result, expectedResult)
        }
    }

    describe("updatePostTitle()") {
        it("should call postService.updateTitle()") {
            // Given
            val author: User = users[0]
            val post: Post = posts[0]!!
            val title = "Qux"
            val input = UpdatePostTitleInput(post.id, title)
            val expectedResult: Post? = post.copy(title = title)
            `when`(postService.findOneById(post.id, author)).thenReturn(post)
            `when`(postService.updateTitle(post, title)).thenReturn(expectedResult)

            // When
            val result: Post? = mutationResolver.updatePostTitle(input)

            // Then
            Assertions.assertEquals(result, expectedResult)
        }

        it("should not update title and return null if the post is not existing") {
            // Given
            val title = "Qux"
            val input = UpdatePostTitleInput("1", title)
            val expectedResult: Post? = null
            `when`(postService.findOneById("1")).thenReturn(null)

            // When
            val result: Post? = mutationResolver.updatePostTitle(input)

            // THen
            Assertions.assertEquals(result, expectedResult)
        }
    }

    describe("updatePostStatus()") {
        it("should call postService.updateStatus()") {
            // Given
            val author: User = users[0]
            val post: Post = posts[0]!!
            val status = Status.DRAFT
            val input = UpdatePostStatusInput(post.id, status)
            val expectedResult: Post? = post.copy(status = status)
            `when`(postService.findOneById(post.id, author)).thenReturn(post)
            `when`(postService.updateStatus(post, status)).thenReturn(expectedResult)

            // When
            val result: Post? = mutationResolver.updatePostStatus(input)

            // Then
            Assertions.assertEquals(result, expectedResult)
        }

        it("should not update status and return null if the post is not existing") {
            // Given
            val status = Status.DRAFT
            val input = UpdatePostStatusInput("1", status)
            val expectedResult: Post? = null
            `when`(postService.findOneById("1")).thenReturn(null)

            // When
            val result: Post? = mutationResolver.updatePostStatus(input)

            // THen
            Assertions.assertEquals(result, expectedResult)
        }
    }

    describe("updatePostContent()") {
        it("should call postService.updateContent()") {
            // Given
            val author: User = users[0]
            val post: Post = posts[0]!!
            val markdown = "# Hello, world!"
            val input = UpdatePostContentInput(post.id, markdown)
            val expectedResult: Post? = post.copy(markdown = markdown, html = "<h1>Hello, world!</h1>")
            `when`(postService.findOneById(post.id, author)).thenReturn(post)
            `when`(postService.updateContent(post, markdown)).thenReturn(expectedResult)

            // When
            val result: Post? = mutationResolver.updatePostContent(input)

            // Then
            Assertions.assertEquals(result, expectedResult)
        }

        it("should not update content and return null if the post is not existing") {
            // Given
            val markdown = "# Hello, world!"
            val input = UpdatePostContentInput("1", markdown)
            val expectedResult: Post? = null
            `when`(postService.findOneById("1")).thenReturn(null)

            // When
            val result: Post? = mutationResolver.updatePostContent(input)

            // THen
            Assertions.assertEquals(result, expectedResult)
        }
    }
})
