package com.nomkhonwaan.mb.server.blog

import com.coxautodev.graphql.tools.GraphQLResolver
import org.springframework.stereotype.Component

@Component
class CategoryResolver(private val postService: PostService) : GraphQLResolver<Category> {
    fun latestPublishedPosts(category: Category): List<Post?> {
        return postService.findAll(category, Status.PUBLISHED) ?: listOf()
    }
}
