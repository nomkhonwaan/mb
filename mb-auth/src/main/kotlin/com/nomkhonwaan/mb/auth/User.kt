package com.nomkhonwaan.mb.auth

import com.auth0.json.mgmt.users.User as Auth0User

/**
 * An entity of the User.
 * <p>
 * This entity should create from the returned of the Auth0 user information API.
 */
data class User(
        val id: String,
        val avatarUrl: String,
        val displayName: String
) {
    /**
     * The Builder class of the User.
     */
    companion object Builder {
        private lateinit var id: String
        private lateinit var avatarUrl: String
        private lateinit var displayName: String

        fun withId(id: String): Builder {
            this.id = id
            return this
        }

        fun withAvatarUrl(avatarUrl: String): Builder {
            this.avatarUrl = avatarUrl
            return this
        }

        fun withDisplayName(displayName: String): Builder {
            this.displayName = displayName
            return this
        }

        fun build(): User {
            return User(
                    this.id,
                    this.avatarUrl,
                    this.displayName
            )
        }
    }
}
