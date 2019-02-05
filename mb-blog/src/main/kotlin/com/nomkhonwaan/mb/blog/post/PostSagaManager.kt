package com.nomkhonwaan.mb.blog.post

import com.nomkhonwaan.mb.blog.category.Category
import com.nomkhonwaan.mb.blog.category.FindCategoryByIdQuery
import org.axonframework.commandhandling.gateway.CommandGateway
import org.axonframework.modelling.saga.SagaEventHandler
import org.axonframework.modelling.saga.StartSaga
import org.axonframework.queryhandling.QueryGateway
import org.axonframework.spring.stereotype.Saga
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.autoconfigure.EnableAutoConfiguration
import java.util.concurrent.CompletableFuture
import kotlin.streams.toList

/**
 * A saga manager of the Post.
 * <p>
 * The saga will do similar aggregate but for transactional events.
 */
@Saga
@EnableAutoConfiguration
class PostSagaManager/*(private val commandGateway: CommandGateway, private val queryGateway: QueryGateway)*/ {
    /**
     * An inject of the command gateway.
     * <p>
     * NOTE: this property can not inject via class constructor due to unable to initiate class object.
     */
    @Autowired
    private lateinit var commandGateway: CommandGateway

    /**
     * An injection of the query gateway.
     * <p>
     * NOTE: this property can not inject via class constructor due to unable to initiate class object.
     */
    @Autowired
    private lateinit var queryGateway: QueryGateway

    /**
     * Handles list of Category IDs verification Event.
     * <p>
     * It needs to be verified an existing of the Category before updating the Post.
     *
     * @param event A verify list of Category IDs Event
     */
    @StartSaga
    @SagaEventHandler(associationProperty = "id")
    fun handle(event: VerifyCategoryIdsStartedEvent) {
        val findCategoryByIdFutures: List<CompletableFuture<Category>> = event.categoryIds.filterNotNull().map {
            queryGateway.query(FindCategoryByIdQuery(it), Category::class.java)
        }

        CompletableFuture
                .allOf(*findCategoryByIdFutures.toTypedArray())
                .thenApply { findCategoryByIdFutures.stream().map { it.join() }.toList() }
                .thenApply { commandGateway.send<Unit>(CompleteVerifyCategoryIdsCommand(event.id, it.filterNotNull())) }
    }
}
