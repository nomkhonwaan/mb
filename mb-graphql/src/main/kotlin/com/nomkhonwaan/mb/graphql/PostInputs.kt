package com.nomkhonwaan.mb.graphql

/**
 * An Input class for updating Post title.
 *
 * @param id    An identifier of the Post
 * @param title A title of the Post
 */
data class UpdatePostTitleInput(override val id: String, val title: String): Input<String>(id)

/**
 * An Input class for updating Post Categories.
 *
 * @param id          An identifier of the Post
 * @param categoryIds A list of Category IDs
 */
data class UpdatePostCategoriesInput(override val id: String, val categoryIds: List<String?>): Input<String>(id)
