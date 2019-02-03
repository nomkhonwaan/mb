package com.nomkhonwaan.mb.server

import com.coxautodev.graphql.tools.GraphQLMutationResolver
import com.nomkhonwaan.mb.server.auth.User
import com.nomkhonwaan.mb.server.auth.whenAuthorized
import com.nomkhonwaan.mb.server.blog.*
import com.nomkhonwaan.mb.server.exception.UnauthorizedException
import org.axonframework.commandhandling.gateway.CommandGateway
import org.bson.types.ObjectId
import org.springframework.stereotype.Component

@Component
class MutationResolver(
        private val postService: PostService,
        private val commandGateway: CommandGateway
) : GraphQLMutationResolver {
    /**
     * Create a new empty post.
     *
     * @throws UnauthorizedException
     */
    fun createPost(): Post {
//        return whenAuthorized { postService.create(it) }
        return whenAuthorized {
//            commandGateway.send<Any>(com.nomkhonwaan.mb.blog.CreatePostCommand(ObjectId.get().toHexString()))
//            commandGateway.send<PostAggregate>(CreatePostCommand(ObjectId.get().toHexString(), it))

            postService.create(it)
        }
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
