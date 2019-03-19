package com.nomkhonwaan.mb.storage

import com.amazonaws.services.s3.AmazonS3
import com.amazonaws.services.s3.model.AmazonS3Exception
import com.amazonaws.services.s3.model.ObjectMetadata
import com.nomkhonwaan.mb.common.messaging.attachment.*
import org.axonframework.commandhandling.CommandHandler
import org.axonframework.eventhandling.EventBus
import org.axonframework.eventhandling.GenericEventMessage
import org.springframework.boot.autoconfigure.EnableAutoConfiguration
import org.springframework.stereotype.Component

/**
 * A command handler of the Attachment.
 *
 * @param eventBus A generic event bus for publishing the new Event
 */
@Component
@EnableAutoConfiguration
class StorageCommandHandler(
        private val eventBus: EventBus,
        private val amazonS3: AmazonS3
) {
    /**
     * Handles an Attachment uploading Command.
     *
     * @param command A Command for uploading an Attachment
     */
    @CommandHandler
    fun handle(command: UploadAttachmentCommand) {
        eventBus.publish(GenericEventMessage.asEventMessage<UploadingAttachmentEvent>(
                UploadingAttachmentEvent(
                        command.id,
                        command.inputStream,
                        command.size,
                        command.path
                )
        ))

        try {
            amazonS3.putObject(
                    "nomkhonwaan-com",
                    "${command.path}/${command.id}",
                    command.inputStream,
                    ObjectMetadata().apply { contentLength = command.size }
            )

            eventBus.publish(GenericEventMessage.asEventMessage<AttachmentUploadedEvent>(AttachmentUploadedEvent(command.id)))
        } catch (err: AmazonS3Exception) {
            eventBus.publish(GenericEventMessage.asEventMessage<AttachmentRolledbackEvent>(
                    AttachmentRolledbackEvent(
                            command.id,
                            command.path
                    )
            ))
        }
    }
}
