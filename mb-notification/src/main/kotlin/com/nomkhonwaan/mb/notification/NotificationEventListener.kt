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
        // TODO: Will notify with generated frontend URL for accessibility
//        lineNotifyService
//                .notify("The Post [${event.id}] has been created by [${event.authorId}] at [${event.createdAt.toRFC3339()}]")
//                .subscribe()
    }

    @EventHandler
    fun handle(event: PostTitleUpdatedEvent) {
        // TODO: Will notify with generated frontend URL for accessibility
//        lineNotifyService
//                .notify("The Post [${event.id}] title has been changed to [${event.title}] at [${event.updatedAt.toRFC3339()}]")
//                .subscribe()
    }
}
