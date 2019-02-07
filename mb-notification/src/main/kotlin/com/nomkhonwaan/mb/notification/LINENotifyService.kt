package com.nomkhonwaan.mb.notification

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
     * Sends a POST request to the LINE notify server for notifying me on the personal chat.
     *
    //     * @param body A LINE notify request body
     */
    @FormUrlEncoded
    @POST("/api/notify")
    fun notify(@Field("message") message: String): Observable<Response>
}
