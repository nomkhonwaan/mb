package com.nomkhonwaan.mb.restful

import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.multipart.MultipartFile

/**
 * A RESTful controller for handling resource path: /v1/files.
 * <p>
 * This is
 */
@RestController
@RequestMapping("/v1/files")
class FileController {
    @PostMapping("/upload")
    fun upload(@RequestParam("file") multipartFile: MultipartFile): String {
        return "OK"
    }
}
