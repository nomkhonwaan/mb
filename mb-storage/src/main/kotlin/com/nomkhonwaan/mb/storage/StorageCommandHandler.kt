package com.nomkhonwaan.mb.storage

import com.nomkhonwaan.mb.common.messaging.attachment.AttachmentUploadedEvent
import com.nomkhonwaan.mb.common.messaging.attachment.CompleteAttachmentUploadingCommand
import com.nomkhonwaan.mb.common.messaging.attachment.UploadAttachmentCommand
import com.nomkhonwaan.mb.common.messaging.attachment.UploadingAttachmentEvent
import org.axonframework.commandhandling.CommandHandler
import org.axonframework.eventhandling.EventBus
import org.axonframework.eventhandling.GenericEventMessage
import org.springframework.boot.autoconfigure.EnableAutoConfiguration
import org.springframework.stereotype.Component

@Component
@EnableAutoConfiguration
class StorageCommandHandler(private val eventBus: EventBus) {
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

    @CommandHandler
    fun handle(command: CompleteAttachmentUploadingCommand) {
        eventBus.publish(GenericEventMessage.asEventMessage<AttachmentUploadedEvent>(AttachmentUploadedEvent(command.id)))
    }
}
