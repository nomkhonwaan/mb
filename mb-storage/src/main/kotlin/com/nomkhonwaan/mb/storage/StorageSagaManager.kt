package com.nomkhonwaan.mb.storage

import org.axonframework.commandhandling.gateway.CommandGateway
import org.axonframework.queryhandling.QueryGateway
import org.axonframework.spring.stereotype.Saga
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.autoconfigure.EnableAutoConfiguration

/**
 * A saga manager of the Storage.
 * <p>
 * The saga will do similar aggregate but for transactional events.
 */
@Saga
@EnableAutoConfiguration
class StorageSagaManager {
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

    constructor(commandGateway: CommandGateway, queryGateway: QueryGateway) : this() {
        this.commandGateway = commandGateway
        this.queryGateway = queryGateway
    }
}
