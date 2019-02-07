package com.nomkhonwaan.mb.server

import com.nomkhonwaan.mb.server.auth.User
import com.nomkhonwaan.mb.server.blog.*
import com.nomkhonwaan.mb.server.fixture.categories
import com.nomkhonwaan.mb.server.fixture.filterBy
import com.nomkhonwaan.mb.server.fixture.posts
import com.nomkhonwaan.mb.server.fixture.users
import org.junit.jupiter.api.Assertions
import org.mockito.Mockito.`when`
import org.mockito.Mockito.mock
import org.spekframework.spek2.Spek
import org.spekframework.spek2.style.specification.describe
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.context.SecurityContextHolder

object QueryResolverSpec : Spek({
    val categoryService: CategoryService = mock(CategoryService::class.java)
    val postService: PostService = mock(PostService::class.java)
    val queryResolver = QueryResolver(categoryService, postService)

    beforeEachTest {
        SecurityContextHolder.getContext().authentication =
                UsernamePasswordAuthenticationToken(users[0], null, listOf())
    }

    afterEachTest {
        SecurityContextHolder.getContext().authentication =
                UsernamePasswordAuthenticationToken("anonymousUser", null, listOf())
    }

    describe("categories()") {
        it("should call categoryService.findAllByStatus()") {
            // Given
            val expectedResult: List<Category?> = categories
            `when`(categoryService.findAll()).thenReturn(categories)

            // When
            val result: List<Category?> = queryResolver.categories()

            // Then
            Assertions.assertEquals(result, expectedResult)
        }
    }

    describe("latestPublishedPost()") {
        it("should call postService.findAllByStatus() with [Status.PUBLISHED]") {
            // Given
            val status = Status.PUBLISHED
            val expectedResult: List<Post?> = posts.filterBy(status)
            `when`(postService.findAllByStatus(status)).thenReturn(expectedResult)

            // When
            val result: List<Post?> = queryResolver.latestPublishedPosts()

            // Then
            Assertions.assertEquals(result, expectedResult)
        }
    }

    describe("latestDraftPosts()") {
        it("should call postService.findAllByStatus() with [Status.DRAFT] and [User]") {
            // Given
            val author: User = users[0]
            val status = Status.DRAFT
            val expectedResult: List<Post?> = posts.filterBy(author).filterBy(status)
            `when`(postService.findAllByStatus(status, author)).thenReturn(expectedResult)

            // When
            val result: List<Post?> = queryResolver.latestDraftPosts()

            // Then
            Assertions.assertEquals(result, expectedResult)
        }
    }
})