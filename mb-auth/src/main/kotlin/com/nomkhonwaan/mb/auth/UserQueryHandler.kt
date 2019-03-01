package com.nomkhonwaan.mb.auth

import com.auth0.client.mgmt.ManagementAPI
import com.auth0.client.mgmt.filter.UserFilter
import com.auth0.exception.APIException
import com.auth0.exception.Auth0Exception
import com.auth0.net.Request
import com.nomkhonwaan.mb.common.messaging.user.FindUserByIDQuery
import com.nomkhonwaan.mb.common.messaging.user.User
import org.axonframework.queryhandling.QueryHandler
import org.springframework.boot.autoconfigure.EnableAutoConfiguration
import org.springframework.stereotype.Component
import com.auth0.json.mgmt.users.User as Auth0User

/**
 * A query handler of the User.
 *
 * @param managementAPI A Management API for doing with Auth0 Management API
 */
@Component
@EnableAutoConfiguration
class UserQueryHandler(private val managementAPI: ManagementAPI) {
    /**
     * Returns a single User from the Auth0 API.
     *
     * @param query A query for finding a single User by their ID
     */
    @QueryHandler
    fun handle(query: FindUserByIDQuery): User? {
        val request: Request<Auth0User> = managementAPI.users().get(query.id, UserFilter())

        return try {
            val user: Auth0User = request.execute()

            return User.Builder
                    .withId(user.id)
                    .withAvatarUrl(user.picture)
                    .withDisplayName(user.name)
                    .build()
        } catch (err: APIException) {
            null
        } catch (err: Auth0Exception) {
            null
        }
    }
}
