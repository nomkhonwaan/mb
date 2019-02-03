package com.nomkhonwaan.mb.common.time

import java.time.ZonedDateTime
import java.time.format.DateTimeFormatter

/**
 * Formats a ZonedDateTime to string in the RFC3339 format.
 */
fun ZonedDateTime.toRFC3339(): String {
    return this.format(DateTimeFormatter.ISO_INSTANT)
}
