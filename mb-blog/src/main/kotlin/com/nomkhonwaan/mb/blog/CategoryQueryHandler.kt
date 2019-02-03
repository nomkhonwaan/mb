package com.nomkhonwaan.mb.blog

import org.axonframework.queryhandling.QueryHandler
import org.springframework.boot.autoconfigure.EnableAutoConfiguration
import org.springframework.stereotype.Component

/**
 * A query handler of the Category.
 *
 * @param categoryRepository A CRUD repository of the Category
 */
@Component
@EnableAutoConfiguration
class CategoryQueryHandler(private val categoryRepository: CategoryRepository) {
    /**
     * Returns a list of categories from the query store.
     *
     * @param query A Query for finding a list of Categories
     */
    @QueryHandler
    fun handle(query: FindAllCategoriesQuery): List<Category?> {
        return categoryRepository.findAll()
    }
}
