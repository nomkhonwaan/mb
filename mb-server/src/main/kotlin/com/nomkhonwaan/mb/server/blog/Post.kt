package com.nomkhonwaan.mb.server.blog

import com.nomkhonwaan.mb.server.auth.User
import org.springframework.data.annotation.CreatedDate
import org.springframework.data.annotation.Id
import org.springframework.data.annotation.LastModifiedDate
import org.springframework.data.mongodb.core.mapping.DBRef
import org.springframework.data.mongodb.core.mapping.Document
import java.time.ZonedDateTime

@Document(collection = "posts")
data class Post(
        @Id val id: String? = null,
        var title: String? = null,
        var slug: String? = null,
        var publishedAt: ZonedDateTime? = null,
        var status: Status,
        var markdown: String? = null,
        var html: String? = null,
        @DBRef var author: User,
        @DBRef var categories: List<Category?>,
        @CreatedDate val createdAt: ZonedDateTime? = null,
        @LastModifiedDate val updatedAt: ZonedDateTime? = null
)
