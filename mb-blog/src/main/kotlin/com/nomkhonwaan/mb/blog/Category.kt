package com.nomkhonwaan.mb.blog

import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document

/**
 * A document entity of the Category.
 * <p>
 * This class supports MongoDB with @Document annotation and naming collection "categories".
 */
@Document(collection = "categories")
data class Category(
        @Id val id: String,
        var name: String,
        var slug: String? = null
)
