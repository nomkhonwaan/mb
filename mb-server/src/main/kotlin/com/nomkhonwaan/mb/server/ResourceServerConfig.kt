package com.nomkhonwaan.mb.server

import com.nomkhonwaan.mb.server.auth.UserRepository
import org.springframework.boot.autoconfigure.security.oauth2.resource.PrincipalExtractor
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter

@Configuration
@EnableResourceServer
class ResourceServerConfig(private val userRepository: UserRepository) : ResourceServerConfigurerAdapter() {
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

    @Bean
    fun principalExtractor(): PrincipalExtractor {
        return PrincipalExtractor { userRepository.findByEmail(it["email"].toString()) }
    }
}
