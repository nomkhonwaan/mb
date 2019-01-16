package com.nomkhonwaan.mb.server.file

import com.nomkhonwaan.mb.server.auth.User
import org.springframework.web.multipart.MultipartFile

interface StorageService {
    /**
     * Make a new directory on the specified path.
     */
    fun mkdir(path: String): String

    /**
     * Handle file uploading to the storage server.
     */
    fun upload(multipartFile: MultipartFile, path: String, uploader: User): Attachment?
}
