package com.nomkhonwaan.mb.notification.line

import io.reactivex.Observable
import retrofit2.http.Field
import retrofit2.http.FormUrlEncoded
import retrofit2.http.POST

/**
 * A LINE notify service.
 * <p>
 * This interface will be implemented by Retrofit library.
 */

interface LINENotifyService {
    /**
     * Sends a text message notification.
     *
     * @param message A message string to be sent to the receiver
     */
    @FormUrlEncoded
    @POST("/api/notify")
    fun notify(@Field("message") message: String): Observable<Response>
}
