package com.nomkhonwaan.mb.server.file.internal

import com.amazonaws.services.s3.AmazonS3
import com.nomkhonwaan.mb.server.auth.User
import com.nomkhonwaan.mb.server.file.Attachment
import com.nomkhonwaan.mb.server.file.AttachmentRepository
import com.nomkhonwaan.mb.server.file.StorageService
import org.springframework.web.multipart.MultipartFile

class StorageServiceImpl(
        private val amazonS3: AmazonS3,
        private val bucketName: String,
        private val attachmentRepository: AttachmentRepository
) : StorageService {
    override fun mkdir(path: String): String {
        TODO("not implemented") //To change body of created functions use File | Settings | File Templates.
    }

    override fun upload(multipartFile: MultipartFile, path: String, uploader: User): Attachment? {
        TODO("not implemented") //To change body of created functions use File | Settings | File Templates.
    }
}
