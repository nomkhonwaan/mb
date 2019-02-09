package com.nomkhonwaan.mb.graphql

import com.nomkhonwaan.mb.blog.post.Status

/**
 * An Input class for updating Post title.
 *
 * @param id    An identifier of the Post
 * @param title A title of the Post
 */
data class UpdatePostTitleInput(override val id: String, val title: String): Input<String>(id)

/**
 * An Input class for updating Post status.
 *
 * @param id     An identifier of the Post
 * @param status A status of the Post
 */
data class UpdatePostStatusInput(override val id: String, val status: Status) : Input<String>(id)

/**
 * An Input class for updating Post content.
 *
 * @param id       An identifier of the Post
 * @param markdown A content of the Post in markdown syntax
 */
data class UpdatePostContentInput(override val id: String, val markdown: String): Input<String>(id)

/**
 * An Input class for updating Post Categories.
 *
 * @param id          An identifier of the Post
 * @param categoryIds A list of Category IDs
 */
data class UpdatePostCategoriesInput(override val id: String, val categoryIds: List<String?>): Input<String>(id)
