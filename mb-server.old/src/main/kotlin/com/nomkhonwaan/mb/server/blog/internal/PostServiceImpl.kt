package com.nomkhonwaan.mb.server.blog.internal

import com.github.slugify.Slugify
import com.nomkhonwaan.mb.server.auth.User
import com.nomkhonwaan.mb.server.blog.*
import org.bson.types.ObjectId
import org.commonmark.node.Node
import org.commonmark.parser.Parser
import org.commonmark.renderer.html.HtmlRenderer
import org.springframework.data.domain.Sort
import org.springframework.stereotype.Service
import java.time.ZonedDateTime

@Service
class PostServiceImpl(private val postRepository: PostRepository) : PostService {
    override fun findAllByStatus(status: Status): List<Post?> {
        return if (status == Status.PUBLISHED) {
            postRepository.findAllByStatus(status, sortBy("publishedAt"))
        } else {
            postRepository.findAllByStatus(status)
        }
    }

    override fun findAllByStatus(status: Status, author: User): List<Post?> {
        return if (status == Status.PUBLISHED) {
            postRepository.findAllByStatusAndAuthorId(status, author.id, sortBy("publishedAt"))
        } else {
            postRepository.findAllByStatusAndAuthorId(status, author.id)
        }
    }

    override fun findAllByStatus(status: Status, category: Category): List<Post?> {
        return if (status == Status.PUBLISHED) {
            postRepository.findAllByStatusAndCategoryId(status, category.id, sortBy("publishedAt"))
        } else {
            postRepository.findAllByStatusAndCategoryId(status, category.id)
        }
    }

    override fun findOneById(id: String): Post? {
        return postRepository.findById(id).orElse(null)
    }

    override fun findOneById(id: String, author: User): Post? {
        return findOneById(id)?.takeIf { it.author.id == author.id }
    }

    private fun sortBy(field: String, direction: Sort.Direction = Sort.Direction.DESC): Sort {
        return Sort.by(direction, field)
    }

    override fun create(author: User): Post {
        val post = Post(
                id = ObjectId.get().toHexString(),
                status = Status.DRAFT,
                author = author,
                categories = listOf()
        )

        // The new post needs to configure its slug first,
        // otherwise, it will duplicate with another new post.
        return updateTitle(postRepository.save(post), "")
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
