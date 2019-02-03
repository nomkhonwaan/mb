package com.nomkhonwaan.mb.server.blog

import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document

@Document(collection = "categories")
data class Category(
        @Id val id: String,
        var name: String,
        var slug: String? = null
)
