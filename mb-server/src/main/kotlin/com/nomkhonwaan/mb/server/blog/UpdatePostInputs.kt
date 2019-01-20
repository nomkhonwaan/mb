package com.nomkhonwaan.mb.server.blog

data class UpdatePostTitleInput(
        val id: String,
        val title: String
)

data class UpdatePostStatusInput(
        val id: String,
        val status: Status
)

data class UpdatePostContentInput(
        val id: String,
        val markdown: String
)
