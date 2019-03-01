package com.nomkhonwaan.mb.common.messaging.post

import com.nomkhonwaan.mb.common.cqrs.Event
import com.nomkhonwaan.mb.common.messaging.category.Category
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

/**
 * A Post status updated Event.
 *
 * @param id          An identifier of the Post
 * @param status      A status of the Post
 * @param publishedAt A datatime that the Post was published
 */
data class PostStatusUpdatedEvent(
        override val id: String,
        val status: Status,
        val publishedAt: ZonedDateTime? = null
) : Event<String>(id)

/**
 * A Post content updated Event.
 *
 * @param id        An identifier of the Post
 * @param markdown  A content of the Post in markdown syntax
 * @param html      A content of the Post in HTML format
 * @param updatedAt A datetime that the Post was updated
 */
data class PostContentUpdatedEvent(
        override val id: String,
        val markdown: String,
        val html: String,
        val updatedAt: ZonedDateTime = ZonedDateTime.now()
) : Event<String>(id)

/**
 * A Post categories updated Event.
 *
 * @param id         An identifier of the Post
 * @param categories A list of Categories that had verified
 */
data class PostCategoriesUpdatedEvent(override val id: String, val categories: List<Category?>) : Event<String>(id)

/**
 * A verify list of Category IDs started Event.
 *
 * @param id          An identifier of the Post
 * @param categoryIds A list of Category IDs to be verified
 */
data class VerifyCategoryIdsStartedEvent(override val id: String, val categoryIds: List<String?>) : Event<String>(id)
