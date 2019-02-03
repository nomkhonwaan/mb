//package com.nomkhonwaan.mb.server
//
//import com.nomkhonwaan.mb.server.blog.PostAggregate
//import org.axonframework.eventsourcing.EventSourcingRepository
//import org.axonframework.eventsourcing.eventstore.EventStore
//import org.axonframework.modelling.command.Repository
//import org.springframework.context.annotation.Bean
//import org.springframework.context.annotation.Configuration
//
///**
// * An Axon Framework configuration.
// */
//@Configuration
//class AxonCommandConfig {
//    @Bean
//    fun postAggregateRepository(eventStore: EventStore): Repository<PostAggregate> {
//        return EventSourcingRepository.builder(PostAggregate::class.java)
//                .eventStore(eventStore)
//                .build()
//    }
//}
