package com.nomkhonwaan.mb.autoconfigure

import com.nomkhonwaan.mb.notification.LINENotifyService
import okhttp3.OkHttpClient
import okhttp3.Request
import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import retrofit2.Retrofit
import retrofit2.adapter.rxjava2.RxJava2CallAdapterFactory
import retrofit2.converter.gson.GsonConverterFactory

/**
 * An auto-configure of the LINE notify service.
 */
@Configuration
class LINENotifyConfiguration {
    /**
     * A base URL of the LINE notify API
     */
    @Value("\${line.notify.url}")
    private lateinit var url: String

    /**
     * A static access token for performing LINE notify API
     */
    @Value("\${line.notify.token}")
    private lateinit var token: String

    /**
     * Provides a LINE notify service which is based on Retrofit library.
     */
    @Bean
    fun lineNotifyService(): LINENotifyService {
        val retrofit: Retrofit = Retrofit.Builder()
                .baseUrl(url)
                .addCallAdapterFactory(RxJava2CallAdapterFactory.createAsync())
                .addConverterFactory(GsonConverterFactory.create())
                .client(authorizedHTTPClient())
                .build()

        return retrofit.create(LINENotifyService::class.java)
    }

    /**
     * An authorized HTTP client which is embedded an access token to the "Authorization" header.
     */
    private fun authorizedHTTPClient(): OkHttpClient {
        return OkHttpClient.Builder()
                .addInterceptor {
                    val builder: Request.Builder = it.request().newBuilder()
                            .addHeader("Authorization", "Bearer $token")

                    it.proceed(builder.build())
                }
                .build()
    }
}
