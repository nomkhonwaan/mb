package com.nomkhonwaan.mb.graphql

import com.coxautodev.graphql.tools.GraphQLMutationResolver
import com.nomkhonwaan.mb.blog.post.*
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
     * Creates a new Post with DRAFT status and empty categories and tags.
     */
    @PreAuthorize("hasRole('ROLE_USER')")
    fun createPost(): CompletableFuture<Post> {
        val authorId: String = SecurityContextHolder.getContext().authentication.principal as String

        return commandGateway
                .send<String>(CreatePostCommand("", authorId))
                .thenApply { queryPostSync(it) }
    }

    /**
     * Updates a title of the Post.
     *
     * @param input An Input data for updating Post title
     */
    @PreAuthorize("hasRole('ROLE_USER')")
    fun updatePostTitle(input: UpdatePostTitleInput): CompletableFuture<Post?> {
        val authorId: String = SecurityContextHolder.getContext().authentication.principal as String

        return queryGateway
                .query(FindOwnPostByIDQuery(input.id, authorId), Post::class.java)
                .thenComposeAsync { post: Post ->
                    commandGateway
                            .send<Unit>(UpdatePostTitleCommand(post.id, input.title))
                            .thenApply { queryPostSync(post.id) }
                }
    }

    /**
     * Updates a list of the Categories of the Post.
     *
     * @param input An Input data for updating Post Categories
     */
    @PreAuthorize("hasRole('ROLE_USER')")
    fun updatePostCategories(input: UpdatePostCategoriesInput): CompletableFuture<Post?> {
        val authorId: String = SecurityContextHolder.getContext().authentication.principal as String

        return queryGateway
                .query(FindOwnPostByIDQuery(input.id, authorId), Post::class.java)
                .thenComposeAsync { post: Post ->
                    commandGateway
                            .send<Unit>(UpdatePostCategoriesCommand(post.id, input.categoryIds))
                            .thenApply { queryPostSync(post.id) }
                }
    }

    /**
     * Queries Post by its ID synchronously.
     *
     * @param id An identifier of the Post
     */
    private fun queryPostSync(id: String): Post? {
        return queryGateway
                .subscriptionQuery(FindPostByIDQuery(id), Post::class.java, Post::class.java)
                .updates()
                .blockFirst()
    }
}
