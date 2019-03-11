package com.nomkhonwaan.mb.storage

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
class StorageCommandHandler(private val eventBus: EventBus) {
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
    }

    /**
     * Handles an Attachment uploading successfully Command.
     *
     * @param command A Command for confirm that the Attachment has been uploaded successfully.
     */
    @CommandHandler
    fun handle(command: CompleteAttachmentUploadingCommand) {
        eventBus.publish(GenericEventMessage.asEventMessage<AttachmentUploadedEvent>(AttachmentUploadedEvent(command.id)))
    }

    /**
     * Handles an Attachment rolling-back Command.
     *
     * @param command A Command for rolling-back an uploaded Attachment
     */
    @CommandHandler
    fun handle(command: RollbackAttachmentCommand) {
        eventBus.publish(GenericEventMessage.asEventMessage<AttachmentRolledbackEvent>(
                AttachmentRolledbackEvent(
                        command.id,
                        command.path
                )
        ))
    }
}
