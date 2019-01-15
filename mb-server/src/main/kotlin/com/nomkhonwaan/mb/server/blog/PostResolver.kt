package com.nomkhonwaan.mb.server.blog

import com.coxautodev.graphql.tools.GraphQLResolver
import com.nomkhonwaan.mb.server.time.toRFC3339
import org.springframework.stereotype.Component

@Component
class PostResolver : GraphQLResolver<Post> {
    fun publishedAt(post: Post): String? {
        return post.publishedAt?.toRFC3339()
    }

    fun createdAt(post: Post): String? {
        return post.createdAt?.toRFC3339()
    }

    fun updatedAt(post: Post): String? {
        return post.updatedAt?.toRFC3339()
    }
}
