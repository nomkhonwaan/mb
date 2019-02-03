package com.nomkhonwaan.mb.blog

import org.axonframework.eventhandling.EventHandler
import org.axonframework.queryhandling.QueryUpdateEmitter
import org.springframework.boot.autoconfigure.EnableAutoConfiguration
import org.springframework.stereotype.Component

/**
 * A event listener of the Post.
 *
 * @param postRepository A CRUD repository of the Post
 */
@Component
@EnableAutoConfiguration
class PostEventListener(
        private val postRepository: PostRepository,
        private val queryUpdateEmitter: QueryUpdateEmitter
) {
    /**
     * Stores a newly created Post to the query store.
     *
     * @param event A Post created Event
     */
    @EventHandler
    fun handle(event: PostCreatedEvent) {
        val post: Post = postRepository.save(
                Post(
                        id = event.id,
                        status = event.status,
                        authorId = event.authorId,
                        categories = event.categories,
                        createdAt = event.createdAt
                )
        )

        queryUpdateEmitter.emit(FindPostByIDQuery::class.java, { it.id == event.id }, post)
    }

    /**
     * Saves an updated title Post to the query store.
     *
     * @param event A Post title updated Event
     */
    @EventHandler
    fun handle(event: PostTitleUpdatedEvent) {
        val post: Post? = postRepository.findById(event.id).orElse(null)?.run {
            postRepository.save(this.apply {
                title = event.title
                slug = event.slug
                updatedAt = event.updatedAt
            })
        }

        queryUpdateEmitter.emit(FindPostByIDQuery::class.java, { it.id == event.id }, post)
    }
}
