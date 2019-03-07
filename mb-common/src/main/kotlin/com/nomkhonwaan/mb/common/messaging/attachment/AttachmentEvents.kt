package com.nomkhonwaan.mb.common.messaging.attachment

import com.nomkhonwaan.mb.common.messaging.Event
import java.io.InputStream

/**
 * An uploading Attachment Event.
 *
 * @param id          An identifier of the Attachment
 * @param filename    An original filename
 * @param inputStream An uploaded file input stream
 * @param size        A size of the uploaded file
 * @param path        A path that the file will be uploaded to
 */
data class UploadingAttachmentEvent(
        override val id: String,
        val filename: String,
        val inputStream: InputStream,
        val size: Long,
        val path: String
) : Event<String>(id)

/**
 * An Attachment uploaded Event.
 * <p>
 * This Event will be fired once the uploading process has been completed.
 *
 * @param id An identifier of the Attachment
 */
data class AttachmentUploadedEvent(override val id: String) : Event<String>(id)

/**
 * A rollback uploaded Attachment Event.
 * <p>
 * This Event will be fired once the uploading process has been failed.
 */
data class AttachmentRolledbackEvent(override val id: String, val path: String) : Event<String>(id)
