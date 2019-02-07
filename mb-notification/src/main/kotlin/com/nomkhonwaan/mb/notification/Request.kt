package com.nomkhonwaan.mb.notification

import retrofit2.http.Field

/**
 * A LINE notify request body.
 *
 * @param message          A message to be sent to the receiver, 1000 characters max
 * @param imageThumbnail   An image thumbnail URL, maximum size of 240x240px JPEG
 * @param imageFullSize    A full-size image URL, maximum size of 1024x1024px JPEG
 * @param stickerPackageId An ID of the sticker package
 * @param stickerId        An ID of the sticker
 */
data class Request(
        var message: String,
        var imageThumbnail: String? = null,
        @Field("imageFullsize") var imageFullSize: String? = null,
        var stickerPackageId: Int? = null,
        var stickerId: Int? = null
)
