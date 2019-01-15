package com.nomkhonwaan.mb.server.blog.internal

import com.github.slugify.Slugify
import com.nomkhonwaan.mb.server.auth.User
import com.nomkhonwaan.mb.server.blog.*
import org.commonmark.node.Node
import org.commonmark.parser.Parser
import org.commonmark.renderer.html.HtmlRenderer
import org.springframework.data.domain.Sort
import org.springframework.stereotype.Service
import java.time.ZonedDateTime

@Service
class PostServiceImpl(private val postRepository: PostRepository) : PostService {
    override fun findAll(status: Status): List<Post?> {
        return if (status == Status.PUBLISHED) {
            postRepository.findAllByStatus(status, sortBy("publishedAt"))
        } else {
            postRepository.findAllByStatus(status)
        }
    }

    override fun findAll(author: User, status: Status): List<Post?>? {
        return author.id?.let {
            if (status == Status.PUBLISHED) {
                postRepository.findAllByAuthorIdAndStatus(it, status, sortBy("publishedAt"))
            } else {
                postRepository.findAllByAuthorIdAndStatus(it, status)
            }
        }
    }

    override fun findAll(category: Category, status: Status): List<Post?>? {
        return category.id?.let {
            if (status == Status.PUBLISHED) {
                postRepository.findAllByCategoryIdAndStatus(it, status, sortBy("publishedAt"))
            } else {
                postRepository.findAllByCategoryIdAndStatus(it, status)
            }
        }
    }

    private fun sortBy(field: String, direction: Sort.Direction = Sort.Direction.DESC): Sort {
        return Sort.by(direction, field)
    }

    override fun create(author: User): Post {
        val post: Post = postRepository.save(Post(status = Status.DRAFT, author = author, categories = listOf()))

        // The new post needs to configure its slug first,
        // otherwise, it will duplicate with another new post.
        return updateTitle(post, "")
    }

    override fun updateTitle(post: Post, title: String): Post {
        return postRepository.save(post.apply {
            this.title = title
            slug = "${Slugify().slugify(title)}-$id"
        })
    }

    override fun updateStatus(post: Post, status: Status): Post {
        return postRepository.save(post.apply {
            this.status = status

            if (status == Status.PUBLISHED) {
                publishedAt = ZonedDateTime.now()
            }
        })
    }

    override fun updateContent(post: Post, markdown: String): Post {
        val parser: Parser = Parser.builder().build()
        val document: Node = parser.parse(markdown)
        val renderer: HtmlRenderer = HtmlRenderer.builder().build()

        return postRepository.save(post.apply {
            this.markdown = markdown
            html = renderer.render(document)
        })
    }
}
