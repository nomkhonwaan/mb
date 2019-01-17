package com.nomkhonwaan.mb.server.file

import org.springframework.data.mongodb.repository.MongoRepository
import org.springframework.data.mongodb.repository.Query
import org.springframework.stereotype.Repository

@Repository
interface AttachmentRepository : MongoRepository<Attachment, String> {
    /**
     * Find an attachment by its originalFilename.
     */
    @Query("{ originalFilename: ?0 }")
    fun findByOriginalFilename(originalFilename: String): Attachment?
}
