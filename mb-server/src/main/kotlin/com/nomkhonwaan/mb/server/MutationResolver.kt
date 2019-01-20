package com.nomkhonwaan.mb.server

import com.coxautodev.graphql.tools.GraphQLMutationResolver
import com.nomkhonwaan.mb.server.auth.User
import com.nomkhonwaan.mb.server.auth.whenAuthorized
import com.nomkhonwaan.mb.server.blog.*
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

    /**
     * Update a title of the post.
     */
    fun updatePostTitle(input: UpdatePostTitleInput): Post? {
        try {
            return whenAuthorized { user: User ->
                postService.findOneById(input.id, user)?.let { post: Post ->
                    postService.updateTitle(post, input.title)
                }
            }
        } catch (err: HttpClientErrorException) {
            throw UnauthorizedException(err.message)
        }
    }

    /**
     * Update a status of the post.
     */
    fun updatePostStatus(input: UpdatePostStatusInput): Post? {
        try {
            return whenAuthorized { user: User ->
                postService.findOneById(input.id, user)?.let { post: Post ->
                    postService.updateStatus(post, input.status)
                }
            }
        } catch (err: HttpClientErrorException) {
            throw UnauthorizedException(err.message)
        }
    }

    /**
     * Update a content of the post.
     */
    fun updatePostContent(input: UpdatePostContentInput): Post? {
        try {
            return whenAuthorized { user: User ->
                postService.findOneById(input.id, user)?.let { post: Post ->
                    postService.updateContent(post, input.markdown)
                }
            }
        } catch (err: HttpClientErrorException) {
            throw UnauthorizedException(err.message)
        }
    }
}
