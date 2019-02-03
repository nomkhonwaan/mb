package com.nomkhonwaan.mb.graphql

/**
 * An Input class for updating the Post title.
 *
 * @param id    A identifier of the Post
 * @param title A title of the Post
 */
data class UpdatePostTitleInput(override val id: String, val title: String): Input<String>(id)
