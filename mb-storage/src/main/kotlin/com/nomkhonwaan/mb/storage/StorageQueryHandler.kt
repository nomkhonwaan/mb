package com.nomkhonwaan.mb.storage

import com.amazonaws.services.s3.AmazonS3
import com.amazonaws.services.s3.model.AmazonS3Exception
import com.amazonaws.services.s3.model.S3Object
import com.nomkhonwaan.mb.common.messaging.attachment.Attachment
import com.nomkhonwaan.mb.common.messaging.attachment.FindAttachmentByIdQuery
import org.axonframework.queryhandling.QueryHandler
import org.springframework.boot.autoconfigure.EnableAutoConfiguration
import org.springframework.stereotype.Component

/**
 * A query handler of the Attachment.
 *
 * @param amazonS3 An Amazon S3 client
 */
@Component
@EnableAutoConfiguration
class StorageQueryHandler(private val amazonS3: AmazonS3) {
    /**
     * Returns a single Attachment from the query store.
     *
     * @param query A Query for finding a single Attachment by its ID
     */
    @QueryHandler
    fun handle(query: FindAttachmentByIdQuery): Attachment? {
        return try {
            val s3Object: S3Object = amazonS3.getObject("nomkhonwaan-com", query.id)

            Attachment
                    .withId(s3Object.key)
                    .withContent(s3Object.objectContent)
                    .build()
        } catch (err: AmazonS3Exception) {
            null
        }
    }
}
