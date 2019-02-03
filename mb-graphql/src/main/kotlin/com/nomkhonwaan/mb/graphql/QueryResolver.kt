package com.nomkhonwaan.mb.graphql

import com.coxautodev.graphql.tools.GraphQLQueryResolver
import com.nomkhonwaan.mb.blog.category.Category
import com.nomkhonwaan.mb.blog.category.FindAllCategoriesQuery
import com.nomkhonwaan.mb.blog.post.FindAllDraftPostsQuery
import com.nomkhonwaan.mb.blog.post.FindAllPublishedPostsQuery
import com.nomkhonwaan.mb.blog.post.Post
import org.axonframework.messaging.responsetypes.ResponseTypes
import org.axonframework.queryhandling.QueryGateway
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.stereotype.Component
import java.util.concurrent.CompletableFuture

/**
 * A query resolver root of the GraphQL.
 * <p>
 * The query is a client interface this will proxy all query requests from the client side
 * to the query message bus.
 */
@Component
class QueryResolver(private val queryGateway: QueryGateway) : GraphQLQueryResolver {
    /**
     * Return a list of Categories.
     */
    fun categories(): CompletableFuture<List<Category?>> {
        return queryGateway.query(
                FindAllCategoriesQuery(),
                ResponseTypes.multipleInstancesOf(Category::class.java)
        )
    }

    /**
     * Return a list of published Posts.
     *
     * @param offset An offset of the list of published Posts to be queried
     * @param limit  A maximum number of the Posts to be queried
     */
    fun latestPublishedPosts(offset: Int, limit: Int): CompletableFuture<List<Post?>> {
        return queryGateway.query(
                FindAllPublishedPostsQuery(offset, limit),
                ResponseTypes.multipleInstancesOf(Post::class.java)
        )
    }

    /**
     * Return a list of draft Posts.
     *
     * @param offset An offset of the list of draft Posts to be queried
     * @param limit  A maximum number of the Posts to be queried
     */
    @PreAuthorize("hasRole('ROLE_USER')")
    fun latestDraftPosts(offset: Int, limit: Int): CompletableFuture<List<Post?>> {
        val authorId: String = SecurityContextHolder.getContext().authentication.principal as String

        return queryGateway.query(
                FindAllDraftPostsQuery(authorId, offset, limit),
                ResponseTypes.multipleInstancesOf(Post::class.java)
        )
    }
}
