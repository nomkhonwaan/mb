package com.nomkhonwaan.mb.graphql

import com.coxautodev.graphql.tools.GraphQLResolver
import com.nomkhonwaan.mb.blog.Category
import org.axonframework.queryhandling.QueryGateway

/**
 * A resolver of the Category.
 * <p>
 * This is specific type resolver for performing field query and mutation.
 * Most of the actions performed via the query message bus.
 *
 * @param queryGateway An injection of the QueryGateway for dealing with query message bus
 */
class CategoryResolver(private val queryGateway: QueryGateway) : GraphQLResolver<Category> {

}
