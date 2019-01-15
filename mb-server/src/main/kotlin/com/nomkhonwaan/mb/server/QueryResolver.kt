package com.nomkhonwaan.mb.server

import com.coxautodev.graphql.tools.GraphQLQueryResolver
import com.nomkhonwaan.mb.server.auth.whenAuthorized
import com.nomkhonwaan.mb.server.blog.*
import org.springframework.stereotype.Component

@Component
class QueryResolver(
        private val categoryService: CategoryService,
        private val postService: PostService
) : GraphQLQueryResolver {
    /**
     * Return a list of categories.
     */
    fun categories(): List<Category?> {
        return categoryService.findAll()
    }

    /**
     * Return a list of the latest updated categories.
     */
    fun latestUpdatedCategories(): List<Category?> {
        return listOf()
    }

    /**
     * Return a list of published posts.
     */
    fun latestPublishedPosts(): List<Post?> {
        return postService.findAll(Status.PUBLISHED)
    }

    /**
     * Return a list of draft posts.
     */
    fun latestDraftPosts(): List<Post?> {
        return whenAuthorized {
            postService.findAll(it, Status.DRAFT) ?: listOf()
        }
    }
}
