package com.nomkhonwaan.mb.blog.category

import com.nomkhonwaan.mb.blog.post.PostRepository
import com.nomkhonwaan.mb.common.messaging.category.Category
import com.nomkhonwaan.mb.common.messaging.category.FindAllCategoriesQuery
import com.nomkhonwaan.mb.common.messaging.category.FindAllPublishedPostsBelongingTo
import com.nomkhonwaan.mb.common.messaging.category.FindCategoryByIdQuery
import com.nomkhonwaan.mb.common.messaging.post.Post
import com.nomkhonwaan.mb.common.messaging.post.Status
import org.axonframework.queryhandling.QueryHandler
import org.springframework.boot.autoconfigure.EnableAutoConfiguration
import org.springframework.data.domain.PageRequest
import org.springframework.data.domain.Sort
import org.springframework.stereotype.Component

/**
 * A query handler of the Category.
 *
 * @param categoryRepository A CRUD repository of the Category
 */
@Component
@EnableAutoConfiguration
class CategoryQueryHandler(
        private val categoryRepository: CategoryRepository,
        private val postRepository: PostRepository
) {
    /**
     * Returns a single Category from the query store.
     *
     * @param query A Query for finding a single Category by its ID
     */
    @QueryHandler
    fun handle(query: FindCategoryByIdQuery): Category? {
        return categoryRepository.findById(query.id).orElse(null)
    }

    /**
     * Returns a list of Categories from the query store.
     *
     * @param query A Query for finding a list of Categories
     */
    @QueryHandler
    fun handle(query: FindAllCategoriesQuery): List<Category?> {
        return categoryRepository.findAll()
    }

    /**
     * Returns a list of Posts from the query store.
     *
     * @param query A Query for finding a list of Posts that belong to the Category
     */
    @QueryHandler
    fun handle(query: FindAllPublishedPostsBelongingTo): List<Post?> {
        val page: Int = Math.ceil(query.offset.toDouble() / query.limit.toDouble()).toInt()
        val sort: Sort = Sort.by(Sort.Direction.DESC, "publishedAt")

        return postRepository.findAllByCategoryIdAndStatus(
                query.id,
                Status.PUBLISHED,
                PageRequest.of(page, query.limit, sort)
        )
    }
}
