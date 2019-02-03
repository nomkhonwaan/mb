package com.nomkhonwaan.mb.server.file

import com.nomkhonwaan.mb.server.auth.User
import org.springframework.data.annotation.CreatedDate
import org.springframework.data.annotation.Id
import org.springframework.data.annotation.LastModifiedDate
import org.springframework.data.mongodb.core.mapping.DBRef
import org.springframework.data.mongodb.core.mapping.Document
import java.time.ZonedDateTime

@Document(collection = "attachments")
data class Attachment(
        @Id val id: String,
        val originalFilename: String,
        @DBRef val uploader: User,
        @CreatedDate val createdAt: ZonedDateTime? = null,
        @LastModifiedDate val updatedAt: ZonedDateTime? = null
)
