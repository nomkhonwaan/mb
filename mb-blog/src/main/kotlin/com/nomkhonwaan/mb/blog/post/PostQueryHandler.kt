package com.nomkhonwaan.mb.blog.post

import com.nomkhonwaan.mb.common.messaging.post.*
import org.axonframework.queryhandling.QueryHandler
import org.springframework.boot.autoconfigure.EnableAutoConfiguration
import org.springframework.data.domain.PageRequest
import org.springframework.data.domain.Sort
import org.springframework.stereotype.Component

/**
 * A query handler of the Post.
 *
 * @param postRepository A CRUD repository of the Post
 */
@Component
@EnableAutoConfiguration
class PostQueryHandler(private val postRepository: PostRepository) {
    /**
     * Returns a single Post from the query store.
     *
     * @param query A Query for finding a single Post by its ID
     */
    @QueryHandler
    fun handle(query: FindPostByIdQuery): Post? {
        return postRepository.findById(query.id).orElse(null)
    }

    /**
     * Returns a single Post that belongs to the author from the query store.
     *
     * @param query A Query for finding a single Post that belongs to the author by its ID
     */
    @QueryHandler
    fun handle(query: FindOwnPostByIdQuery): Post? {
        return postRepository.findById(query.id).orElse(null)?.takeIf {
            it.authorId == query.authorId
        }
    }

    /**
     * Returns a list of published Posts from the query store.
     *
     * @param query A Query for finding a list of published Posts
     */
    @QueryHandler
    fun handle(query: FindAllPublishedPostsQuery): List<Post?> {
        val page: Int = Math.ceil(query.offset.toDouble() / query.limit.toDouble()).toInt()
        val sort: Sort = Sort.by(Sort.Direction.DESC, "publishedAt")

        return postRepository.findAllByStatus(Status.PUBLISHED, PageRequest.of(page, query.limit, sort))
    }

    /**
     * Returns a list of draft Posts from the query store.
     *
     * @param query A Query for finding a list of draft Posts
     */
    @QueryHandler
    fun handle(query: FindAllDraftPostsQuery): List<Post?> {
        val page: Int = Math.ceil(query.offset.toDouble() / query.limit.toDouble()).toInt()
        val sort: Sort = Sort.by(Sort.Direction.DESC, "createdAt")

        return postRepository.findAllByAuthorIdAndStatus(
                query.authorId,
                Status.DRAFT,
                PageRequest.of(page, query.limit, sort)
        )
    }
}
