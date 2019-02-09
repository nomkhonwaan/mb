package com.nomkhonwaan.mb.notification

import com.nomkhonwaan.mb.blog.post.PostContentUpdatedEvent
import com.nomkhonwaan.mb.blog.post.PostCreatedEvent
import com.nomkhonwaan.mb.blog.post.PostStatusUpdatedEvent
import com.nomkhonwaan.mb.blog.post.PostTitleUpdatedEvent
import org.axonframework.eventhandling.EventHandler
import org.springframework.boot.autoconfigure.EnableAutoConfiguration
import org.springframework.stereotype.Component

/**
 * An application event listener that will notify me on personal chat for every Event in the application.
 *
 * @param lineNotifyService A LINE notify service
 */
@Component
@EnableAutoConfiguration
class NotificationEventListener(private val lineNotifyService: LINENotifyService) {
    /**
     * Sends a text message when the new Post has been created.
     *
     * @param event A Post created Event
     */
    @EventHandler
    fun on(event: PostCreatedEvent) {
        lineNotifyService
                .notify("""
                    A new Post has been created by [${event.authorId}]: https://www.nomkhonwaan.com/dashboard/posts/${event.id}
                """.trimIndent()).subscribe()
    }

    /**
     * Sends a text message when the Post title has been updated.
     *
     * @param event A Post title updated Event
     */
    @EventHandler
    fun on(event: PostTitleUpdatedEvent) {
        lineNotifyService
                .notify("""
                    The Post [${event.id}] title has been updated to [${event.title}]: https://www.nomkhonwaan.com/dashboard/posts/${event.id}
                """.trimIndent()).subscribe()
    }

    /**
     * Sends a text message when the Post status has been updated.
     *
     * @param event A Post status updated Event
     */
    @EventHandler
    fun on(event: PostStatusUpdatedEvent) {
        lineNotifyService
                .notify("""
                    The Post [${event.id}] status has been updated to [${event.status}]: https://www.nomkhonwaan.com/dashboard/posts/${event.id}
                """.trimIndent()).subscribe()
    }

    /**
     * Sends a text message when the Post content has been updated.
     *
     * @param event A Post content updated Event
     */
    @EventHandler
    fun on(event: PostContentUpdatedEvent) {
        lineNotifyService
                .notify("""
                    The Post [${event.id}] content has been updated: https://www.nomkhonwaan.com/dashboard/posts/${event.id}
                """.trimIndent()).subscribe()
    }
}
