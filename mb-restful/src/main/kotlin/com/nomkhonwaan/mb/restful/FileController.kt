package com.nomkhonwaan.mb.restful

import com.nomkhonwaan.mb.common.messaging.attachment.Attachment
import com.nomkhonwaan.mb.common.messaging.attachment.FindAttachmentByIdQuery
import com.nomkhonwaan.mb.common.messaging.attachment.UploadAttachmentCommand
import org.axonframework.commandhandling.gateway.CommandGateway
import org.axonframework.queryhandling.QueryGateway
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.http.server.ServerHttpResponse
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.multipart.MultipartFile
import reactor.core.publisher.Mono
import reactor.core.publisher.toMono
import java.util.concurrent.CompletableFuture

/**
 * A REST controller for handling on resource path: /v1/files.
 */
@RestController
@RequestMapping("/v1/files")
class FileController(
        private val commandGateway: CommandGateway,
        private val queryGateway: QueryGateway
) {
    /**
     * Handles file uploading request.
     *
     * @param multipartFile An uploaded file
     */
    @PostMapping("/upload")
    fun upload(@RequestParam("file") multipartFile: MultipartFile): Mono<Attachment?> {
        val authorId: String = SecurityContextHolder.getContext().authentication.principal as String
        val filename: String = multipartFile.originalFilename!!

        return commandGateway
                .send<String>(
                        UploadAttachmentCommand(
                                filename,
                                multipartFile.inputStream,
                                multipartFile.size,
                                authorId
                        )
                )
                .thenCompose {
                    queryGateway.query(FindAttachmentByIdQuery("$authorId/$filename"), Attachment::class.java)
                }
                .toMono()
    }
}
