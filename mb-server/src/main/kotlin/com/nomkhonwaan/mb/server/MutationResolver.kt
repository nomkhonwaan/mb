package com.nomkhonwaan.mb.server

import com.coxautodev.graphql.tools.GraphQLMutationResolver
import com.nomkhonwaan.mb.server.auth.whenAuthorized
import com.nomkhonwaan.mb.server.blog.Post
import com.nomkhonwaan.mb.server.blog.PostService
import com.nomkhonwaan.mb.server.exception.UnauthorizedException
import org.springframework.stereotype.Component
import org.springframework.web.client.HttpClientErrorException

@Component
class MutationResolver(
        private val postService: PostService
) : GraphQLMutationResolver {
    /**
     * Create a new empty post.
     */
    fun createPost(): Post {
        try {
            return whenAuthorized {
                postService.create(it)
            }
        } catch (err: HttpClientErrorException) {
            throw UnauthorizedException(err.message)
        }
    }
}
