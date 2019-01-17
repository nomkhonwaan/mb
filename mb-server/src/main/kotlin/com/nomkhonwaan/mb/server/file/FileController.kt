package com.nomkhonwaan.mb.server.file

import com.nomkhonwaan.mb.server.auth.whenAuthorized
import com.nomkhonwaan.mb.server.exception.UnauthorizedException
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
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
            val attachment: Attachment? = whenAuthorized {
                storageService.upload(multipartFile, storageService.mkdir(it.id), it)
            }

            ResponseEntity(attachment, HttpStatus.ACCEPTED)
        } catch (err: UnauthorizedException) {
            ResponseEntity(HttpStatus.UNAUTHORIZED)
        } catch (err: Exception) {
            ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}
