package com.nomkhonwaan.mb.restful

import org.axonframework.commandhandling.gateway.CommandGateway
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.multipart.MultipartFile

/**
 * A REST controller for handling on resource path: /v1/files.
 */
@RestController
@RequestMapping("/v1/files")
class FileController(private val commandGateway: CommandGateway) {
    /**
     * Handles file uploading request.
     *
     * @param multipartFile An uploaded file
     */
    @PostMapping("/upload")
    fun upload(@RequestParam("file") multipartFile: MultipartFile): ResponseEntity<Any> {
        // In case of empty file has been uploaded.
        // So, do nothing but return an HTTP 422 status with empty response.
        if (multipartFile.isEmpty) {
            return ResponseEntity(HttpStatus.UNPROCESSABLE_ENTITY)
        }

        val authorId: String = SecurityContextHolder.getContext().authentication.principal as String

        return ResponseEntity.ok("OK")
    }
}
