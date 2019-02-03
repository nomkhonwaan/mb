package com.nomkhonwaan.mb.graphql

import com.coxautodev.graphql.tools.GraphQLResolver
import com.nomkhonwaan.mb.blog.category.Category
import com.nomkhonwaan.mb.blog.category.FindAllPublishedPostsBelongingTo
import com.nomkhonwaan.mb.blog.post.Post
import org.axonframework.messaging.responsetypes.ResponseTypes
import org.axonframework.queryhandling.QueryGateway
import org.springframework.stereotype.Component
import java.util.concurrent.CompletableFuture

/**
 * A resolver of the Category.
 * <p>
 * This is specific type resolver for performing field query and mutation.
 * Most of the actions performed via the query message bus.
 *
 * @param queryGateway An injection of the QueryGateway for dealing with query message bus
 */
@Component
class CategoryResolver(private val queryGateway: QueryGateway) : GraphQLResolver<Category> {
    /**
     * Returns a list of published Posts ordered by "publishedAt" descending.
     *
     * @param category A Category data object
     * @param offset   An offset of the list of published Posts to be queried
     * @param limit    A maximum number of the Posts to be queried
     */
    fun latestPublishedPosts(category: Category, offset: Int, limit: Int): CompletableFuture<List<Post?>> {
        return queryGateway.query(
                FindAllPublishedPostsBelongingTo(category.id, offset, limit),
                ResponseTypes.multipleInstancesOf(Post::class.java)
        )
    }
}
