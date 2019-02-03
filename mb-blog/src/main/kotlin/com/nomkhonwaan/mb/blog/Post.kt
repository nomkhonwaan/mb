package com.nomkhonwaan.mb.blog

import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.DBRef
import org.springframework.data.mongodb.core.mapping.Document
import java.time.ZonedDateTime

/**
 * A document entity of the Post.
 * <p>
 * This class supports MongoDB with @Document annotation and naming collection "posts".
 */
@Document(collection = "posts")
data class Post(
        @Id val id: String,
        var title: String? = null,
        var slug: String? = null,
        var status: Status,
        var markdown: String? = null,
        var html: String? = null,
        val publishedAt: ZonedDateTime? = null,
        val authorId: String,
        @DBRef var categories: List<Category?>,
        val createdAt: ZonedDateTime,
        var updatedAt: ZonedDateTime? = null
)
