package com.nomkhonwaan.mb.autoconfigure

import com.auth0.client.auth.AuthAPI
import com.auth0.client.mgmt.ManagementAPI
import com.auth0.json.auth.TokenHolder
import org.springframework.beans.factory.annotation.Value
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

/**
 * An auto-configure of the Auth0.
 */
@Configuration
class Auth0Configuration {
    /**
     * An API domain name that registered with Auth0
     */
    @Value("\${auth0.domain}")
    private lateinit var domain: String

    /**
     * An audience of the API
     */
    @Value("\${auth0.audience}")
    private lateinit var audience: String

    /**
     * A machine-to-machine client ID
     */
    @Value("\${auth0.client-id}")
    private lateinit var clientID: String

    /**
     * A machine-to-machine client secret
     */
    @Value("\${auth0.client-secret}")
    private lateinit var clientSecret: String

    /**
     * Provides an Auth0 API client.
     */
    @Bean
    @ConditionalOnMissingBean
    fun authAPI(): AuthAPI {
        return AuthAPI(domain, clientID, clientSecret)
    }

    /**
     * Provides an Auth0 Management API client.
     * <p>
     * The Management API requires for retrieving user information by their ID from Auth0 APIs.
     */
    @Bean
    @ConditionalOnMissingBean
    fun managementAPI(authAPI: AuthAPI): ManagementAPI {
        val holder: TokenHolder = authAPI().requestToken(audience).execute()

        return ManagementAPI(domain, holder.accessToken)
    }
}
