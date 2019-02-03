package com.nomkhonwaan.mb.graphql

import com.coxautodev.graphql.tools.GraphQLMutationResolver
import com.nomkhonwaan.mb.blog.*
import org.axonframework.commandhandling.gateway.CommandGateway
import org.axonframework.queryhandling.QueryGateway
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.stereotype.Component
import java.util.concurrent.CompletableFuture

/**
 * A mutation resolver root of the GraphQL.
 * <p>
 * The mutation is a client interface that will proxy all command requests from the client side
 * to the command message bus.
 *
 * @param commandGateway An injection of the CommandGateway for dealing with command message bus
 * @param queryGateway   An injection of the QueryGateway for dealing with query message bus
 */
@Component
class MutationResolver(
        private val commandGateway: CommandGateway,
        private val queryGateway: QueryGateway
) : GraphQLMutationResolver {
    /**
     * Create a new Post with DRAFT status and empty categories and tags.
     */
    @PreAuthorize("hasRole('ROLE_USER')")
    fun createPost(): CompletableFuture<Post> {
        val authorId: String = SecurityContextHolder.getContext().authentication.principal as String

        return commandGateway
                .send<String>(CreatePostCommand("", authorId))
                .thenApply {
                    queryGateway
                            .subscriptionQuery(FindPostByIDQuery(it), Post::class.java, Post::class.java)
                            .updates()
                            .blockFirst()
                }
    }

    /**
     * Update a title of the Post.
     *
     * @param input An Input data for updating the Post title
     */
    @PreAuthorize("hasRole('ROLE_USER')")
    fun updatePostTitle(input: UpdatePostTitleInput): CompletableFuture<Post?> {
        val authorId: String = SecurityContextHolder.getContext().authentication.principal as String

        return queryGateway
                .query(FindOwnPostByIDQuery(input.id, authorId), Post::class.java)
                .thenComposeAsync { post: Post ->
                    commandGateway
                            .send<Unit>(UpdatePostTitleCommand(post.id, input.title))
                            .thenApply {
                                queryGateway
                                        .subscriptionQuery(FindPostByIDQuery(post.id), Post::class.java, Post::class.java)
                                        .updates()
                                        .blockFirst()
                            }
                }
    }
}
