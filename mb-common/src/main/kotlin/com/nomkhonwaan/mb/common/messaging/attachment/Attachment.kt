package com.nomkhonwaan.mb.common.messaging.attachment

import java.io.InputStream

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
        private lateinit var content: InputStream
        private lateinit var url: String

        fun withId(id: String): Builder {
            this.id = id
            return this
        }

        fun withContent(content: InputStream): Builder {
            this.content = content
            return this
        }

        fun withUrl(url: String): Builder {
            this.url = url
            return this
        }

        fun build(): Attachment {
            return Attachment(id)
        }
    }
}