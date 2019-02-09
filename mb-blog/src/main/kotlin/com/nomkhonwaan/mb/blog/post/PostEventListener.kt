package com.nomkhonwaan.mb.blog.post

import org.axonframework.eventhandling.EventHandler
import org.axonframework.queryhandling.QueryUpdateEmitter
import org.springframework.boot.autoconfigure.EnableAutoConfiguration
import org.springframework.stereotype.Component

/**
 * An event listener of the Post.
 *
 * @param postRepository     A CRUD repository of the Post
 * @param queryUpdateEmitter An update emitter that will emit signal to the query bus immediately
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
    fun on(event: PostCreatedEvent) {
        val post: Post = postRepository.save(
                Post(
                        id = event.id,
                        status = event.status,
                        authorId = event.authorId,
                        categories = event.categories,
                        createdAt = event.createdAt
                )
        )

        queryUpdateEmitter.emit(FindPostByIdQuery::class.java, { it.id == event.id }, post)
    }

    /**
     * Saves an updated title Post to the query store.
     *
     * @param event A Post title updated Event
     */
    @EventHandler
    fun on(event: PostTitleUpdatedEvent) {
        return postRepository.findById(event.id).ifPresent { post: Post ->
            postRepository.save(post.apply {
                title = event.title
                slug = event.slug
                updatedAt = event.updatedAt
            })

            queryUpdateEmitter.emit(FindPostByIdQuery::class.java, { it.id == event.id }, post)
        }

    }

    /**
     * Saves an updated status Post to the query store.
     *
     * @param event A Post status updated Event
     */
    @EventHandler
    fun on(event: PostStatusUpdatedEvent) {
        return postRepository.findById(event.id).ifPresent { post: Post ->
            postRepository.save(post.apply {
                status = event.status
                publishedAt = event.publishedAt
            })

            queryUpdateEmitter.emit(FindPostByIdQuery::class.java, { it.id == event.id }, post)
        }
    }

    /**
     * Saves an updated content Post to the query store.
     *
     * @param event A Post content updated Event
     */
    @EventHandler
    fun on(event: PostContentUpdatedEvent) {
        return postRepository.findById(event.id).ifPresent { post: Post ->
            postRepository.save(post.apply {
                markdown = event.markdown
                html = event.html
                updatedAt = event.updatedAt
            })

            queryUpdateEmitter.emit(FindPostByIdQuery::class.java, { it.id == event.id }, post)
        }

    }

    /**
     * Saves an updated categories Post to the query store.
     *
     *@param event A Post categories updated Event
     */
    @EventHandler
    fun on(event: PostCategoriesUpdatedEvent) {
        return postRepository.findById(event.id).ifPresent { post: Post ->
            postRepository.save(post.apply {
                categories = event.categories
            })

            queryUpdateEmitter.emit(FindPostByIdQuery::class.java, { it.id == event.id }, post)
        }
    }
}
