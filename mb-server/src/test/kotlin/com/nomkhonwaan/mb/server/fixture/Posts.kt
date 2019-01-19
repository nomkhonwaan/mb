package com.nomkhonwaan.mb.server.fixture

import com.github.slugify.Slugify
import com.nomkhonwaan.mb.server.auth.User
import com.nomkhonwaan.mb.server.blog.Category
import com.nomkhonwaan.mb.server.blog.Post
import com.nomkhonwaan.mb.server.blog.Status
import org.bson.types.ObjectId
import java.time.ZonedDateTime

val posts: List<Post?> = listOf(
        Post(
                id = ObjectId.get().toHexString(),
                title = "Foo",
                publishedAt = ZonedDateTime.now().minusDays(1),
                status = Status.PUBLISHED,
                author = users[0],
                categories = listOf(categories[0]),
                createdAt = ZonedDateTime.now(),
                updatedAt = ZonedDateTime.now().plusDays(1)
        ).apply {
            slug = "${Slugify().slugify(title)}-$id"
        },
        Post(
                id = ObjectId.get().toHexString(),
                title = "Bar",
                status = Status.DRAFT,
                author = users[1],
                categories = listOf(categories[1]),
                createdAt = ZonedDateTime.now()
        ).apply {
            slug = "${Slugify().slugify(title)}-$id"
        }
)

fun List<Post?>.filterBy(status: Status): List<Post?> {
    return this.filter { it?.status == status }
}

fun List<Post?>.filterBy(author: User): List<Post?> {
    return this.filter { it?.author?.id == author.id }
}

fun List<Post?>.filterBy(category: Category): List<Post?> {
    return this.filter { it?.categories?.contains(category) ?: false }
}
