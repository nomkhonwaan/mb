package com.nomkhonwaan.mb.autoconfigure

import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean
import org.springframework.boot.autoconfigure.security.oauth2.resource.PrincipalExtractor
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter

/**
 * An auto-configure of the OAuth2 resource server.
 */
@Configuration
@EnableResourceServer
@EnableGlobalMethodSecurity(prePostEnabled = true)
class ResourceServerConfiguration : ResourceServerConfigurerAdapter() {
    /**
     * Configures all routes permission.
     *
     * @param http An HTTP security object
     */
    override fun configure(http: HttpSecurity) {
        // @formatter:off
        http
                .cors().disable()
                .csrf().disable()

                .authorizeRequests()
                .antMatchers("/v1/files/upload/**").authenticated()
                .anyRequest().permitAll()
        // @formatter:on
    }

    /**
     * Customizes principal to using "sub" field. Default is "name".
     */
    @Bean
    @ConditionalOnMissingBean
    fun principalExtractor(): PrincipalExtractor {
        return PrincipalExtractor { it["sub"] }
    }
}
