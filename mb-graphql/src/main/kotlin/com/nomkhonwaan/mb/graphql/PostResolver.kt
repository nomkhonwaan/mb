package com.nomkhonwaan.mb.graphql

import com.coxautodev.graphql.tools.GraphQLResolver
import com.nomkhonwaan.mb.common.messaging.post.Post
import com.nomkhonwaan.mb.common.messaging.user.FindUserByIDQuery
import com.nomkhonwaan.mb.common.messaging.user.User
import com.nomkhonwaan.mb.common.time.toRFC3339
import org.axonframework.queryhandling.QueryGateway
import org.springframework.stereotype.Component
import java.util.concurrent.CompletableFuture

/**
 * A resolver of the Post.
 * <p>
 * This is a specific type resolver for performing field query and mutation.
 * Most of the actions performed via the query message bus.
 *
 * @param queryGateway An injection of the QueryGateway for dealing with query message bus
 */
@Component
class PostResolver(private val queryGateway: QueryGateway) : GraphQLResolver<Post> {
    /**
     * Resolves an author of the Post from its authorId.
     *
     * @param post A Post data object
     */
    fun author(post: Post): CompletableFuture<User> {
        return queryGateway.query(FindUserByIDQuery(post.authorId), User::class.java)
    }

    /**
     * Returns a "publishedAt" string in the RFC3339 format.
     * <p>
     * This field will be available after the Post has been published. Default is null.
     *
     * @param post A Post data object
     */
    fun publishedAt(post: Post): String? {
        return post.publishedAt?.toRFC3339()
    }

    /**
     * Returns a "createdAt" string in the RFC3339 format.
     *
     * @param post A Post data object
     */
    fun createdAt(post: Post): String {
        return post.createdAt.toRFC3339()
    }

    /**
     * Returns an "updatedAt" string in the RFC3339 format.
     * <p>
     * This field will be available after the Post has been updated. Default is null.
     *
     * @param post A Post data object
     */
    fun updatedAt(post: Post): String? {
        return post.updatedAt?.toRFC3339()
    }
}
