package com.nomkhonwaan.mb.server.file

import com.nomkhonwaan.mb.server.auth.User
import com.nomkhonwaan.mb.server.auth.whenAuthorized
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.client.HttpClientErrorException
import org.springframework.web.multipart.MultipartFile

@RestController
@RequestMapping("/v1/files")
class FileController(private val storageService: StorageService) {
    @PostMapping("/upload")
    fun upload(@RequestParam("file") multipartFile: MultipartFile): ResponseEntity<Attachment?> {
        if (multipartFile.isEmpty) {
            return ResponseEntity(HttpStatus.UNPROCESSABLE_ENTITY)
        }

        return try {
            val attachment: Attachment? = whenAuthorized { user: User ->
                user.id?.let {
                    val path: String = storageService.mkdir(it)
                    storageService.upload(multipartFile, path, user)
                }
            }

            ResponseEntity(attachment, HttpStatus.ACCEPTED)
        } catch (err: HttpClientErrorException) {
            ResponseEntity(err.statusCode)
        } catch (err: Exception) {
            ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}
