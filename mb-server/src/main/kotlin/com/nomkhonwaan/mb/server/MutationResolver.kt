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
     *
     * @throws UnauthorizedException
     */
    fun createPost(): Post {
        return whenAuthorized { postService.create(it) }
    }

    /**
     * Update a title of the post.
     *
     * @throws UnauthorizedException
     */
    fun updatePostTitle(input: UpdatePostTitleInput): Post? {
        return whenAuthorized { user: User ->
            postService.findOneById(input.id, user)?.let { post: Post ->
                postService.updateTitle(post, input.title)
            }
        }
    }

    /**
     * Update a status of the post.
     *
     * @throws UnauthorizedException
     */
    fun updatePostStatus(input: UpdatePostStatusInput): Post? {
        return whenAuthorized { user: User ->
            postService.findOneById(input.id, user)?.let { post: Post ->
                postService.updateStatus(post, input.status)
            }
        }
    }

    /**
     * Update a content of the post.
     *
     * @throws UnauthorizedException
     */
    fun updatePostContent(input: UpdatePostContentInput): Post? {
        return whenAuthorized { user: User ->
            postService.findOneById(input.id, user)?.let { post: Post ->
                postService.updateContent(post, input.markdown)
            }
        }
    }
}
