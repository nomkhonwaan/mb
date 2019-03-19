package com.nomkhonwaan.mb.common.messaging.attachment

import com.nomkhonwaan.mb.common.messaging.Command
import java.io.InputStream

/**
 * An Attachment file uploading Command.
 *
 * @param id          An identifier of the Attachment
 * @param inputStream An uploaded file input stream
 * @param size        A size of the uploaded file
 * @param path        A path that the file will be uploaded to
 */
data class UploadAttachmentCommand(
        override val id: String,
        val inputStream: InputStream,
        val size: Long,
        val path: String
) : Command<String>(id)
