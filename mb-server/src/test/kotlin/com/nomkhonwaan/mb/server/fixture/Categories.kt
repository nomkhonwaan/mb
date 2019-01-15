package com.nomkhonwaan.mb.server.fixture

import com.github.slugify.Slugify
import com.nomkhonwaan.mb.server.blog.Category
import org.bson.types.ObjectId

val categories: List<Category> = listOf(
        Category(id = ObjectId.get().toHexString(), name = "Foo").apply {
            slug = "${Slugify().slugify(name)}-$id"
        },
        Category(id = ObjectId.get().toHexString(), name = "Bar").apply {
            slug = "${Slugify().slugify(name)}-$id"
        },
        Category(name = "Baz").apply {
            slug = "${Slugify().slugify(name)}-$id"
        }
)
