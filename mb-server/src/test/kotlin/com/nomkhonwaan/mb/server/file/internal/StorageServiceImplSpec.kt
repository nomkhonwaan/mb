package com.nomkhonwaan.mb.server.file.internal

import com.amazonaws.services.s3.AmazonS3
import com.amazonaws.services.s3.model.ObjectMetadata
import com.nomkhonwaan.mb.server.auth.User
import com.nomkhonwaan.mb.server.file.Attachment
import com.nomkhonwaan.mb.server.file.AttachmentRepository
import com.nomkhonwaan.mb.server.fixture.users
import org.bson.types.ObjectId
import org.junit.jupiter.api.Assertions
import org.mockito.ArgumentCaptor
import org.mockito.Mockito.*
import org.spekframework.spek2.Spek
import org.spekframework.spek2.style.specification.describe
import org.springframework.mock.web.MockMultipartFile
import org.springframework.web.multipart.MultipartFile

object StorageServiceImplSpec : Spek({
    val amazonS3: AmazonS3 = mock(AmazonS3::class.java)
    val bucketName = "nomkhonwaan-com"
    val attachmentRepository: AttachmentRepository = mock(AttachmentRepository::class.java)
    val storageService = StorageServiceImpl(amazonS3, bucketName, attachmentRepository)

    afterEachTest {
        reset(attachmentRepository)
    }

    describe("mkdir()") {
        it("should return a path string") {
            // Given
            val path = "foo/bar"
            val expectedResult = "foo/bar"

            // When
            val result: String = storageService.mkdir(path)

            // Then
            Assertions.assertEquals(result, expectedResult)
        }
    }

    describe("upload()") {
        it("should upload an uploaded file to the storage server and save a new attachment to the database") {
            // Given
            val uploader: User = users[0]
            val multipartFile: MultipartFile = MockMultipartFile("foo.jpg", null)
            val path: String = storageService.mkdir(uploader.id)
            `when`(amazonS3.putObject(
                    bucketName,
                    multipartFile.originalFilename,
                    multipartFile.inputStream,
                    ObjectMetadata().apply { contentLength = multipartFile.size }
            )).thenReturn(null)
            val mockResult = Attachment(
                    id = ObjectId.get().toHexString(),
                    originalFilename = multipartFile.originalFilename!!,
                    uploader = uploader
            )
            val captor: ArgumentCaptor<Attachment> = ArgumentCaptor.forClass(Attachment::class.java)
            `when`(attachmentRepository.findByOriginalFilename(multipartFile.originalFilename!!)).thenReturn(null)
            `when`<Attachment>(attachmentRepository.save(any())).thenReturn(mockResult)

            // When
            storageService.upload(multipartFile, path, uploader)

            // Then
            verify(attachmentRepository).save(captor.capture())

            Assertions.assertNotEquals(captor.value.id, "")
            Assertions.assertEquals(captor.value.originalFilename, multipartFile.originalFilename)
            Assertions.assertEquals(captor.value.uploader, uploader)
        }

        it("should upload an uploaded file to the storage server and update an existing attachment in the database") {
            // Given
            val uploader: User = users[0]
            val multipartFile: MultipartFile = MockMultipartFile("foo.jpg", null)
            val path: String = storageService.mkdir(uploader.id)
            `when`(amazonS3.putObject(
                    bucketName,
                    multipartFile.originalFilename,
                    multipartFile.inputStream,
                    ObjectMetadata().apply { contentLength = multipartFile.size }
            )).thenReturn(null)
            val expectedResult = Attachment(
                    id = ObjectId.get().toHexString(),
                    originalFilename = multipartFile.originalFilename!!,
                    uploader = uploader
            )
            `when`(attachmentRepository.findByOriginalFilename(multipartFile.originalFilename!!)).thenReturn(expectedResult)
            `when`(attachmentRepository.save(expectedResult)).thenReturn(expectedResult)

            // When
            val result: Attachment? = storageService.upload(multipartFile, path, uploader)

            // Then
            Assertions.assertEquals(result, expectedResult)
        }

        it("should return null if an MultipartFile.originalFilename is null") {
            // Given
            val uploader: User = users[0]
            val multipartFile: MultipartFile = MockMultipartFile("foo.jpg", null, null, null)
            val path: String = storageService.mkdir(uploader.id)
            val expectedResult = null

            // When
            val result: Attachment? = storageService.upload(multipartFile, path, uploader)

            // Then
            Assertions.assertEquals(result, expectedResult)
        }
    }
})
