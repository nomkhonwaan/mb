package com.nomkhonwaan.mb.server.auth

import org.springframework.data.annotation.CreatedDate
import org.springframework.data.annotation.Id
import org.springframework.data.annotation.LastModifiedDate
import org.springframework.data.mongodb.core.mapping.Document
import java.time.ZonedDateTime

@Document(collection = "users")
data class User(
        @Id val id: String? = null,
        var avatarUrl: String? = null,
        var displayName: String? = null,
        var emails: List<UserEmail>,
        @CreatedDate val createdAt: ZonedDateTime? = null,
        @LastModifiedDate val updatedAt: ZonedDateTime? = null
)
