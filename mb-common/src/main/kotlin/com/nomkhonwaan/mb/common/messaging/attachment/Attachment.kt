package com.nomkhonwaan.mb.common.messaging.attachment

/**
 * An entity of the Attachment.
 * <p>
 * This entity should create from the [Builder] class.
 */
data class Attachment(val id: String) {
    /**
     * The Builder class of the Attachment.
     */
    companion object Builder {
        private lateinit var id: String

        fun withId(id: String): Builder {
            this.id = id
            return this
        }

        fun build(): Attachment {
            return Attachment(id)
        }
    }
}