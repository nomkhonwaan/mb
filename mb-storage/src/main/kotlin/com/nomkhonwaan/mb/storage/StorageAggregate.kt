package com.nomkhonwaan.mb.storage

import com.nomkhonwaan.mb.common.messaging.attachment.*
import org.axonframework.commandhandling.CommandHandler
import org.axonframework.eventsourcing.EventSourcingHandler
import org.axonframework.modelling.command.AggregateIdentifier
import org.axonframework.modelling.command.AggregateLifecycle
import org.axonframework.spring.stereotype.Aggregate

/**
 * An aggregation of the Attachment.
 */
@Aggregate
class StorageAggregate() {
    @AggregateIdentifier
    private lateinit var id: String

    /**
     * Handles Attachment uploading Command.
     *
     * @param command A Command for uploading Attachment
     */
    @CommandHandler
    constructor(command: UploadAttachmentCommand) : this() {
        AggregateLifecycle.apply(
                UploadingAttachmentEvent(
                        command.id,
                        command.inputStream,
                        command.size,
                        command.path
                )
        )
    }

    /**
     * Handles Attachment uploading successfully Command.
     *
     * @param command A Command for file uploaded successfully
     */
    @CommandHandler
    fun handle(command: CompleteAttachmentUploadingCommand) {
        AggregateLifecycle.apply(
                AttachmentUploadedEvent(
                        command.id
                )
        )
    }

    /**
     * Handles rolling-back uploaded Attachment Command.
     *
     * @param command A Command for rolling-back uploaded file
     */
    @CommandHandler
    fun handle(command: RollbackUploadedAttachmentCommand) {
        AggregateLifecycle.apply(
                RollingbackUploadedFileEvent(
                        command.id,
                        command.path
                )
        )
    }

    /**
     * Listens on Attachment uploaded Event.
     *
     * @param event An Event of the Attachment uploading Command
     */
    @EventSourcingHandler
    fun on(event: UploadingAttachmentEvent) {
        id = event.id
    }
}
