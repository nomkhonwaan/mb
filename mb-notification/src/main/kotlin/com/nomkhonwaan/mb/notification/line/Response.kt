package com.nomkhonwaan.mb.notification.line

/**
 * A LINE notify response.
 *
 * @param status  An HTTP response status
 * @param message An HTTP response message
 */
data class Response(val status: Int, val message: String)
