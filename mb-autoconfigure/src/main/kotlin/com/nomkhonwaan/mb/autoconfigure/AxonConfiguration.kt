package com.nomkhonwaan.mb.autoconfigure

import com.mongodb.MongoClient
import org.axonframework.eventsourcing.eventstore.EmbeddedEventStore
import org.axonframework.eventsourcing.eventstore.EventStorageEngine
import org.axonframework.eventsourcing.eventstore.EventStore
import org.axonframework.extensions.mongo.DefaultMongoTemplate
import org.axonframework.extensions.mongo.eventsourcing.eventstore.MongoEventStorageEngine
import org.axonframework.spring.config.AxonConfiguration
import org.springframework.beans.factory.annotation.Value
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

/**
 * An auto-configure of the Axon Framework.
 */
@Configuration
class AxonConfiguration {
    /**
     * A custom database name for storing the event sourcing data. Default is "axonframework".
     */
    @Value("\${axon.extensions.mongo.databaseName:axonframework}")
    private lateinit var databaseName: String

    /**
     * This method provides by official documentation at
     * [Mongo](https://docs.axoniq.io/reference-guide/extensions/mongo)
     * <p>
     * The Event store `EmbeddedEventStore` delegates actual storage and retrieval of events to an `EventStorageEngine`.
     */
    @Bean
    @ConditionalOnMissingBean
    fun eventStore(storageEngine: EventStorageEngine, configuration: AxonConfiguration): EmbeddedEventStore {
        return EmbeddedEventStore.builder()
                .storageEngine(storageEngine)
                .messageMonitor(configuration.messageMonitor(EventStore::class.java, "eventStore"))
                .build()
    }

    /**
     * Provides an event storage engine.
     * <p>
     * This is an overriding of the EventStorageEngine configuration
     * for enabling MongoDB for the event store instead of Axon Server.
     */
    @Bean
    @ConditionalOnMissingBean
    fun storageEngine(client: MongoClient): EventStorageEngine {
        return MongoEventStorageEngine.builder()
                .mongoTemplate(
                        DefaultMongoTemplate.builder()
                                .mongoDatabase(client, databaseName)
                                .build()
                ).build()
    }
}
