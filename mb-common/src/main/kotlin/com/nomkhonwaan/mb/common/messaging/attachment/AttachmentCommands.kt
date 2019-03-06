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
data class UploadFileCommand(
        override val id: String,
        val inputStream: InputStream,
        val size: Long,
        val path: String
) : Command<String>(id)

/**
 * A complete Attachment uploading Command.
 *
 * @param id An identifier of the Attachment
 */
data class CompleteFileUploadingCommand(override val id: String) : Command<String>(id)

/**
 * A rollback Attachment uploading Command.
 * <p>
 * This command for rollback uploaded file in the storage server in case of failure.
 *
 * @param id   An identifier of the Attachment
 * @param path A path that the file belongs to
 */
data class RollbackFileUploadingCommand(override val id: String, val path: String) : Command<String>(id)
