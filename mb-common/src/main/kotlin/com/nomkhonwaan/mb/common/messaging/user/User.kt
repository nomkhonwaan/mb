package com.nomkhonwaan.mb.common.messaging.user

/**
 * An entity of the User.
 * <p>
 * This entity should create from the [Builder] class.
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
            return User(id, avatarUrl, displayName)
        }
    }
}
