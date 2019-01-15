package com.nomkhonwaan.mb.server.time

import java.time.ZonedDateTime
import java.time.format.DateTimeFormatter

/**
 * Convert ZonedDateTime to RFC3339 format.
 */
fun ZonedDateTime.toRFC3339(): String {
    return this.format(DateTimeFormatter.ISO_INSTANT)
}
