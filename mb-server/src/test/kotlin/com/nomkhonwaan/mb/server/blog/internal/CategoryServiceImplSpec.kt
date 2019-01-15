package com.nomkhonwaan.mb.server.blog.internal

import com.nomkhonwaan.mb.server.blog.Category
import com.nomkhonwaan.mb.server.blog.CategoryRepository
import com.nomkhonwaan.mb.server.fixture.categories
import org.junit.jupiter.api.Assertions
import org.mockito.Mockito
import org.mockito.Mockito.`when`
import org.spekframework.spek2.Spek
import org.spekframework.spek2.style.specification.describe

object CategoryServiceImplSpec : Spek({
    val categoryRepository: CategoryRepository = Mockito.mock(CategoryRepository::class.java)
    val categoryService = CategoryServiceImpl(categoryRepository)

    describe("findAllByAuthorId()") {
        it("should return a list of categories") {
            // Given
            val expectedResult: List<Category?> = categories
            `when`(categoryRepository.findAll()).thenReturn(categories)

            // When
            val result: List<Category?> = categoryService.findAll()

            // Then
            Assertions.assertEquals(result, expectedResult)
        }
    }
})
