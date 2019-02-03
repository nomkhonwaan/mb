package com.nomkhonwaan.mb.auth

import com.nomkhonwaan.mb.common.cqrs.Query

/**
 * Finds a single User by their ID Query.
 *
 * @param id An identifier of the User
 */
data class FindUserByIDQuery(val id: String): Query()
