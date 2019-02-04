package com.nomkhonwaan.mb.auth

import com.auth0.json.mgmt.users.User as Auth0User

/**
 * An entity of the User.
 * <p>
 * This entity should create from the returned of the Auth0 user information API.
 */
data class User(private val user: Auth0User) {
    val id: String
        get() = user.id

    val displayName: String
        get() = user.name

    val avatarUrl: String
        get() = user.picture
}
