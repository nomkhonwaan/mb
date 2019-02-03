package com.nomkhonwaan.mb.blog

import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document
import java.time.ZonedDateTime

/**
 * A document entity of the Post.
 * <p>
 * This class supports MongoDB collection with @Document annotation and collection name "posts"
 */
@Document(collection = "posts")
data class Post(
        @Id val id: String,
        var title: String? = null,
        var slug: String? = null,
        var status: Status,
        val publishedAt: ZonedDateTime? = null,
        val authorId: String,
        val createdAt: ZonedDateTime,
        var updatedAt: ZonedDateTime? = null
)
