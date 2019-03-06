package com.nomkhonwaan.mb.storage

import com.amazonaws.services.s3.AmazonS3
import com.amazonaws.services.s3.model.AmazonS3Exception
import com.amazonaws.services.s3.model.ObjectMetadata
import com.nomkhonwaan.mb.common.messaging.attachment.*
import org.axonframework.commandhandling.gateway.CommandGateway
import org.axonframework.modelling.saga.EndSaga
import org.axonframework.modelling.saga.SagaEventHandler
import org.axonframework.modelling.saga.StartSaga
import org.axonframework.spring.stereotype.Saga
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.autoconfigure.EnableAutoConfiguration

/**
 * A sage manager of the Attachment.
 */
@Saga
@EnableAutoConfiguration
class StorageSagaManager() {
    /**
     * An injection of the Amazon S3 client.
     * <p>
     * NOTE: this property can not inject via class constructor due to unable to initiate class object.
     */
    @Autowired
    private lateinit var amazonS3: AmazonS3

    /**
     * An injection of the command gateway.
     * <p>
     * NOTE: this property can not inject via class constructor due to unable to initiate class object.
     */
    @Autowired
    private lateinit var commandGateway: CommandGateway

    /**
     * A secondary constructor that enables injection on [commandGateway] and [queryGateway].
     * <p>
     * This constructor purposes for allowing mocked commandGateway and queryGateway to be injected,
     * this will benefit for the unit testing.
     *
     * @param commandGateway A CommandGateway object for dealing with the command message bus
     */
    constructor(commandGateway: CommandGateway) : this() {
        this.commandGateway = commandGateway
    }

    /**
     * Handles Attachment uploading Event.
     * <p>
     * After finished, will dispatch the next Event based on scenario.
     *
     * @param event An uploading Attachment Event
     */
    @StartSaga
    @SagaEventHandler(associationProperty = "id")
    fun handle(event: UploadingFileEvent) {
        try {
            amazonS3.putObject(
                    "nomkhonwaan-com",
                    "${event.path}/${event.id}",
                    event.inputStream,
                    ObjectMetadata().apply { contentLength = event.size }
            )

            commandGateway.send<Unit>(CompleteFileUploadingCommand(event.id))
        } catch (err: AmazonS3Exception) {
            commandGateway.send<Unit>(RollbackFileUploadingCommand(event.id, event.path))
        }
    }

    /**
     * Handles Attachment rolling-back Event.
     * <p>
     * Will check on the storage server and delete if exists.
     *
     * @param event A rolling-back uploaded Attachment Event
     */
    @EndSaga
    @SagaEventHandler(associationProperty = "id")
    fun handle(event: RollingbackUploadedFileEvent) {
        try {
            // TODO: handles file deleting on Amazon S3
        } catch (err: AmazonS3Exception) {

        }
    }
}
