package com.nomkhonwaan.mb.server.file

import com.nomkhonwaan.mb.server.auth.User
import com.nomkhonwaan.mb.server.fixture.users
import org.bson.types.ObjectId
import org.junit.jupiter.api.Assertions
import org.mockito.Mockito.`when`
import org.mockito.Mockito.mock
import org.spekframework.spek2.Spek
import org.spekframework.spek2.style.specification.describe
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.mock.web.MockMultipartFile
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.web.multipart.MultipartFile

object FileControllerSpec : Spek({
    val storageService: StorageService = mock(StorageService::class.java)
    val fileController = FileController(storageService)

    beforeEachTest {
        SecurityContextHolder.getContext().authentication =
                UsernamePasswordAuthenticationToken(users[0], null, listOf())
    }

    afterEachTest {
        SecurityContextHolder.getContext().authentication =
                UsernamePasswordAuthenticationToken("anonymousUser", null, listOf())
    }

    describe("upload()") {
        context("with authorized user") {
            it("should call storageService.upload()") {
                // Given
                val uploader: User = users[0]
                val multipartFile: MultipartFile = MockMultipartFile("foo.jpg", "bar".toByteArray())
                val path = storageService.mkdir(uploader.id)
                val expectedResult = Attachment(
                        id = ObjectId.get().toHexString(),
                        originalFilename = multipartFile.originalFilename!!,
                        uploader = uploader
                )
                `when`(storageService.upload(multipartFile, path, uploader)).thenReturn(expectedResult)

                // When
                val result: ResponseEntity<Attachment?> = fileController.upload(multipartFile)

                // Then
                Assertions.assertEquals(result.statusCode, HttpStatus.ACCEPTED)
                Assertions.assertEquals(result.body, expectedResult)
            }

            it("should return an error un-processable entity (422) status") {
                // Given
                val multipartFile: MultipartFile = MockMultipartFile("foo.jpg", null)

                // When
                val result: ResponseEntity<Attachment?> = fileController.upload(multipartFile)

                // Then
                Assertions.assertEquals(result.statusCode, HttpStatus.UNPROCESSABLE_ENTITY)
                Assertions.assertNull(result.body)
            }
        }

        context("with unauthorized user") {
            it("should return an error unauthorized (401) status") {
                // Given
                SecurityContextHolder.getContext().authentication =
                        UsernamePasswordAuthenticationToken("anonymousUser", null, listOf())
                val multipartFile = MockMultipartFile("foo.jpg", "bar".toByteArray())

                // When
                val result: ResponseEntity<Attachment?> = fileController.upload(multipartFile)

                // Then
                Assertions.assertEquals(result.statusCode, HttpStatus.UNAUTHORIZED)
                Assertions.assertNull(result.body)
            }
        }


        it("should return an error internal server error (500) status") {
                       // Given
            val uploader: User = users[0]
            val multipartFile = MockMultipartFile("foo.jpg", "bar".toByteArray())
            val path = storageService.mkdir(uploader.id)
            `when`(storageService.upload(multipartFile, path, uploader)).thenAnswer {
                throw Exception("Something went wrong")
            }

            // When
            val result: ResponseEntity<Attachment?> = fileController.upload(multipartFile)

            // Then
            Assertions.assertEquals(result.statusCode, HttpStatus.INTERNAL_SERVER_ERROR)
            Assertions.assertNull(result.body)
        }
    }
})
