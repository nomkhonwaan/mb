package com.nomkhonwaan.mb.server

import com.nomkhonwaan.mb.server.auth.User
import com.nomkhonwaan.mb.server.blog.Post
import com.nomkhonwaan.mb.server.blog.PostService
import com.nomkhonwaan.mb.server.blog.Status
import com.nomkhonwaan.mb.server.exception.UnauthorizedException
import com.nomkhonwaan.mb.server.fixture.users
import graphql.GraphQLException
import org.bson.types.ObjectId
import org.junit.jupiter.api.Assertions
import org.mockito.Mockito.`when`
import org.mockito.Mockito.mock
import org.spekframework.spek2.Spek
import org.spekframework.spek2.style.specification.describe
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.context.SecurityContextHolder

object MutationResolverSpec : Spek({
    val postService: PostService = mock(PostService::class.java)
    val mutationResolver = MutationResolver(postService)

    beforeEachTest {
        SecurityContextHolder.getContext().authentication =
                UsernamePasswordAuthenticationToken(users[0], null, listOf())
    }

    afterEachTest {
        SecurityContextHolder.getContext().authentication =
                UsernamePasswordAuthenticationToken("anonymousUser", null, listOf())
    }

    describe("createPost()") {
        context("with authorized user") {
            it("should call postService.create()") {
                // Given
                val author: User = users[0]
                val expectedResult = Post(
                        id = ObjectId.get().toHexString(),
                        status = Status.DRAFT,
                        author = author,
                        categories = listOf()
                )
                `when`(postService.create(author)).thenReturn(expectedResult)

                // When
                val result: Post = mutationResolver.createPost()

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
                    mutationResolver.createPost()
                }

                // Then
                Assertions.assertEquals(err.message, GraphQLException(UnauthorizedException().message).message)
            }
        }
    }
})
