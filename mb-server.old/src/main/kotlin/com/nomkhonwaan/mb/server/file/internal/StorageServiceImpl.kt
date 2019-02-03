package com.nomkhonwaan.mb.server.file.internal

import com.amazonaws.services.s3.AmazonS3
import com.amazonaws.services.s3.model.ObjectMetadata
import com.nomkhonwaan.mb.server.auth.User
import com.nomkhonwaan.mb.server.file.Attachment
import com.nomkhonwaan.mb.server.file.AttachmentRepository
import com.nomkhonwaan.mb.server.file.StorageService
import org.bson.types.ObjectId
import org.springframework.web.multipart.MultipartFile

class StorageServiceImpl(
        private val amazonS3: AmazonS3,
        private val bucketName: String,
        private val attachmentRepository: AttachmentRepository
) : StorageService {
    override fun mkdir(path: String): String {
        return path
    }

    override fun upload(multipartFile: MultipartFile, path: String, uploader: User): Attachment? {
        return multipartFile.originalFilename?.let {
            amazonS3.putObject(
                    bucketName,
                    "$path/$it",
                    multipartFile.inputStream,
                    ObjectMetadata().apply { contentLength = multipartFile.size }
            )

            val attachment: Attachment = attachmentRepository.findByOriginalFilename(it)
                    ?: Attachment(
                            id = ObjectId.get().toHexString(),
                            originalFilename = it,
                            uploader = uploader
                    )

            attachmentRepository.save(attachment)
        }
    }
}
