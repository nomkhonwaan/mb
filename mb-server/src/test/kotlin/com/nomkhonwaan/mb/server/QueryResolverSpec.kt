package com.nomkhonwaan.mb.server

import com.nomkhonwaan.mb.server.auth.User
import com.nomkhonwaan.mb.server.blog.*
import com.nomkhonwaan.mb.server.exception.UnauthorizedException
import com.nomkhonwaan.mb.server.fixture.categories
import com.nomkhonwaan.mb.server.fixture.filterBy
import com.nomkhonwaan.mb.server.fixture.posts
import com.nomkhonwaan.mb.server.fixture.users
import graphql.GraphQLException
import org.junit.jupiter.api.Assertions
import org.mockito.Mockito
import org.mockito.Mockito.`when`
import org.spekframework.spek2.Spek
import org.spekframework.spek2.style.specification.describe
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.context.SecurityContextHolder

object QueryResolverSpec : Spek({
    val categoryService: CategoryService = Mockito.mock(CategoryService::class.java)
    val postService: PostService = Mockito.mock(PostService::class.java)
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
        it("should return a list of categories") {
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
        it("should call postService.findAll() with [Status.PUBLISHED]") {
            // Given
            val status = Status.PUBLISHED
            val expectedResult: List<Post?> = posts.filterBy(status)
            `when`(postService.findAll(status)).thenReturn(expectedResult)

            // When
            val result: List<Post?> = queryResolver.latestPublishedPosts()

            // Then
            Assertions.assertEquals(result, expectedResult)
        }
    }

    describe("latestDraftPosts()") {
        context("with authorized user") {
            it("should call postService.findAll() with [Status.DRAFT] and [User]") {
                // Given
                val author: User = users[0]
                val status = Status.DRAFT
                val expectedResult: List<Post?> = posts.filterBy(author).filterBy(status)
                `when`(postService.findAll(author, status)).thenReturn(expectedResult)

                // When
                val result: List<Post?> = queryResolver.latestDraftPosts()

                // Then
                Assertions.assertEquals(result, expectedResult)
            }
        }

        context("with unauthorized user") {
            it("should throw an UnauthorizedException which is embedded in the GraphQLException") {
                // Given
                SecurityContextHolder.getContext().authentication =
                        UsernamePasswordAuthenticationToken("anonymousUser", null, listOf())

                // When
                val err: GraphQLException = Assertions.assertThrows(GraphQLException::class.java) {
                    queryResolver.latestDraftPosts()
                }

                // Then
                Assertions.assertEquals(err.message, GraphQLException(UnauthorizedException().message).message)
            }
        }
    }
})
