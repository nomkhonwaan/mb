package com.nomkhonwaan.mb.notification

import com.nomkhonwaan.mb.blog.post.PostCreatedEvent
import com.nomkhonwaan.mb.blog.post.PostTitleUpdatedEvent
import org.axonframework.eventhandling.EventHandler
import org.springframework.boot.autoconfigure.EnableAutoConfiguration
import org.springframework.stereotype.Component

/**
 * A notification listener based on events.
 *
 * @param lineNotifyService A LINE notify service
 */
@Component
@EnableAutoConfiguration
class NotificationEventListener(private val lineNotifyService: LINENotifyService) {
    @EventHandler
    fun handle(event: PostCreatedEvent) {
        lineNotifyService
                .notify("""
                    A new Post has been created by [${event.authorId}]: https://www.nomkhonwaan.com/dashboard/posts/${event.id}
                """.trimIndent()).subscribe()
    }

    @EventHandler
    fun handle(event: PostTitleUpdatedEvent) {
        lineNotifyService
                .notify("""
                    The Post [${event.id}] title has been updated to [${event.title}]: https://www.nomkhonwaan.com/dashboard/posts/${event.id}
                """.trimIndent())
    }
}
