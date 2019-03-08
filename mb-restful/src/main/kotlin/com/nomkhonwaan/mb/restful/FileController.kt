package com.nomkhonwaan.mb.restful

import com.nomkhonwaan.mb.common.messaging.attachment.Attachment
import org.axonframework.commandhandling.gateway.CommandGateway
import org.axonframework.queryhandling.QueryGateway
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.multipart.MultipartFile
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
    fun upload(@RequestParam("file") multipartFile: MultipartFile): ResponseEntity<CompletableFuture<Attachment?>> {
        return ResponseEntity.ok(CompletableFuture.supplyAsync<Attachment?> { null })
//        if (multipartFile.isEmpty) {
//            return ResponseEntity(HttpStatus.UNPROCESSABLE_ENTITY)
//        }
//
//        val authorId: String = SecurityContextHolder.getContext().authentication.principal as String
//        val filename: String = multipartFile.originalFilename!!
//
//        return ResponseEntity.ok(
//                commandGateway
//                        .send<String>(
//                                UploadAttachmentCommand(
//                                        filename,
//                                        multipartFile.inputStream,
//                                        multipartFile.size,
//                                        authorId
//                                )
//                        )
//                        .thenApply {
//                            queryGateway
//                                    .subscriptionQuery(FindAttachmentByIdQuery("$authorId/$it"), Attachment::class.java, Attachment::class.java)
//                                    .updates()
//                                    .blockFirst()
//                        }
//        )
    }
}
