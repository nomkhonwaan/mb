package com.nomkhonwaan.mb.server.blog

import com.nomkhonwaan.mb.server.fixture.categories
import com.nomkhonwaan.mb.server.fixture.filterBy
import com.nomkhonwaan.mb.server.fixture.posts
import org.junit.jupiter.api.Assertions
import org.mockito.Mockito.`when`
import org.mockito.Mockito.mock
import org.spekframework.spek2.Spek
import org.spekframework.spek2.style.specification.describe

object CategoryResolverSpec : Spek({
    val postService: PostService = mock(PostService::class.java)
    val categoryResolver = CategoryResolver(postService)

    describe("latestPublishedPosts()") {
        it("should return a list of posts that belong to the category") {
            // Given
            val category: Category = categories[0]
            val status = Status.PUBLISHED
            val expectedResult: List<Post?> = posts.filterBy(category)
            `when`(postService.findAll(category, status)).thenReturn(expectedResult)

            // When
            val result: List<Post?>? = categoryResolver.latestPublishedPosts(category)

            // Then
            Assertions.assertEquals(result, expectedResult)
        }
    }
})
