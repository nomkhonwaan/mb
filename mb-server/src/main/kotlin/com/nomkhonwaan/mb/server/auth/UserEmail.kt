package com.nomkhonwaan.mb.server.auth

data class UserEmail(
        var email: String,
        var isPrimary: Boolean = false
)
