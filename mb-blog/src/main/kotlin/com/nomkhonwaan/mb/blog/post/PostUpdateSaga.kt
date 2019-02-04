package com.nomkhonwaan.mb.blog.post

import org.axonframework.commandhandling.gateway.CommandGateway
import org.axonframework.modelling.saga.SagaEventHandler
import org.axonframework.modelling.saga.StartSaga
import org.axonframework.spring.stereotype.Saga
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.autoconfigure.EnableAutoConfiguration

@Saga
@EnableAutoConfiguration
class PostUpdateSaga {
    @Autowired
    private lateinit var commandGateway: CommandGateway

    @StartSaga
    @SagaEventHandler(associationProperty = "id")
    fun handle(event: PostCategoriesUpdatedEvent) {
    }
}
