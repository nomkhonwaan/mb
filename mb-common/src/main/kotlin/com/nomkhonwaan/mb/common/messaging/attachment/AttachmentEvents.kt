package com.nomkhonwaan.mb.common.messaging.attachment

import com.nomkhonwaan.mb.common.messaging.Event
import java.io.InputStream

/**
 * An uploading Attachment Event.
 *
 * @param id An identifier of the Attachment
 * @param inputStream An uploaded file input stream
 * @param path        A path that the file will be uploaded to
 */
data class UploadingFileEvent(
        override val id: String,
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
data class FileUploadedEvent(override val id: String) : Event<String>(id)

/**
 * A rolling-back uploaded Attachment Event.
 * <p>
 * This Event will be fired once the uploading process has been failed.
 */
 data class RollingbackUploadedFileEvent(override val id: String, val path: String) : Event<String>(id)
