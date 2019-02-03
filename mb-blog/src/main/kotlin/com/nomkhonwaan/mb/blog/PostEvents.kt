package com.nomkhonwaan.mb.blog

import com.nomkhonwaan.mb.common.cqrs.Event
import java.time.ZonedDateTime

/**
 * A Post created Event.
 *
 * @param id        An identifier of the Post
 * @param status    A status of the Post
 * @param createdAt A datetime that the Post was created
 */
data class PostCreatedEvent(
        override val id: String,
        val status: Status,
        val authorId: String,
        val categories: List<Category?>,
        val createdAt: ZonedDateTime = ZonedDateTime.now()
) : Event<String>(id)

/**
 * A Post title updated Event.
 *
 * @param id        An identifier of the Post
 * @param title     A title of the Post
 * @param updatedAt A datetime that the Post was updated
 */
data class PostTitleUpdatedEvent(
        override val id: String,
        val title: String,
        val slug: String,
        val updatedAt: ZonedDateTime = ZonedDateTime.now()
) : Event<String>(id)
