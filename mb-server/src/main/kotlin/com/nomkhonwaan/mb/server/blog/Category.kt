package com.nomkhonwaan.mb.server.blog

import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document

@Document(collection = "categories")
data class Category(@Id val id: String? = null, var name: String, var slug: String? = null)
