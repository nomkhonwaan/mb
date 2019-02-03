package com.nomkhonwaan.mb.auth

import com.nomkhonwaan.mb.common.cqrs.Query

/**
 * Find a single User by its ID.
 *
 * @param id An identifier of the User
 */
data class FindUserByIDQuery(val id: String): Query()
