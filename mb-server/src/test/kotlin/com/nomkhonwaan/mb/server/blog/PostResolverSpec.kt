package com.nomkhonwaan.mb.server.blog

import com.nomkhonwaan.mb.server.fixture.filterBy
import com.nomkhonwaan.mb.server.fixture.posts
import com.nomkhonwaan.mb.server.fixture.users
import com.nomkhonwaan.mb.server.time.toRFC3339
import org.bson.types.ObjectId
import org.junit.jupiter.api.Assertions
import org.spekframework.spek2.Spek
import org.spekframework.spek2.style.specification.describe
import java.time.ZonedDateTime

object PostResolverSpec : Spek({
    val postResolver = PostResolver()

    describe("publishedAt()") {
        it("should return an RFC3339 format of the publishedAt") {
            // Given
            val post: Post = posts.filterBy(Status.PUBLISHED)[0]!!
            val expectedResult: String? = post.publishedAt?.toRFC3339()

            // When
            val result: String? = postResolver.publishedAt(post)

            // Then
            Assertions.assertEquals(result, expectedResult)
        }

        it("should return null if the publishedAt is null") {
            // Given
            val post: Post = posts.filterBy(Status.DRAFT)[0]!!
            val expectedResult: String? = null

            // When
            val result: String? = postResolver.publishedAt(post)

            // Then
            Assertions.assertEquals(result, expectedResult)
        }
    }

    describe("createdAt()") {
        it("should return an RFC3339 format of the createdAt") {
            // Given
            val post: Post = posts[0]!!
            val expectedResult: String? = post.createdAt?.toRFC3339()

            // When
            val result: String? = postResolver.createdAt(post)

            // Then
            Assertions.assertEquals(result, expectedResult)
        }

        it("should return null if the createdAt is null") {
            // Given
            val author = users[0]
            val post = Post(
                    id = ObjectId.get().toHexString(),
                    status = Status.DRAFT,
                    author = author,
                    categories = listOf()
            )
            val expectedResult: String? = null

            // When
            val result: String? = postResolver.createdAt(post)

            // Then
            Assertions.assertEquals(result, expectedResult)
        }
    }

    describe("updatedAt()") {
        it("should return an RFC3339 format of the updatedAt") {
            // Given
            val post: Post = posts[0]!!
            val expectedResult: String? = post.updatedAt?.toRFC3339()

            // When
            val result: String? = postResolver.updatedAt(post)

            // Then
            Assertions.assertEquals(result, expectedResult)
        }

        it("should return null if the updatedAt is null") {
            // Given
            val author = users[0]
            val post = Post(
                    id = ObjectId.get().toHexString(),
                    status = Status.PUBLISHED,
                    author = author,
                    categories = listOf()
            )
            val expectedResult: String? = null

            // When
            val result: String? = postResolver.updatedAt(post)

            // Then
            Assertions.assertEquals(result, expectedResult)
        }
    }
})
