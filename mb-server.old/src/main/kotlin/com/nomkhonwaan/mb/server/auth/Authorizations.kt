package com.nomkhonwaan.mb.server.auth

import com.nomkhonwaan.mb.server.exception.UnauthorizedException
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.web.client.HttpClientErrorException

/**
 * Call the specific function block with authorized user and return it result.
 *
 * @param block A specific function block to be executed
 * @throws HttpClientErrorException
 */
fun <T : Any?> whenAuthorized(block: (User) -> T): T {
    val user: Any = SecurityContextHolder.getContext().authentication.principal

    if (user is User) {
        return block(user)
    }

    throw UnauthorizedException()
}
