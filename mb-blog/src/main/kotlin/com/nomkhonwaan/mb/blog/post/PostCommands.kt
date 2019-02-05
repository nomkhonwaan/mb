package com.nomkhonwaan.mb.blog.post

import com.nomkhonwaan.mb.blog.category.Category
import com.nomkhonwaan.mb.common.cqrs.Command

/**
 * A Post creation Command.
 *
 * @param id An identifier of the Post
 */
data class CreatePostCommand(override val id: String, val authorId: String) : Command<String>(id)

/**
 * A Post title updating Command.
 *
 * @param id    An identifier of the Post
 * @param title A title of the Post
 */
data class UpdatePostTitleCommand(override val id: String, val title: String) : Command<String>(id)

/**
 * A Post Categories updating Command.
 *
 * @param id            An identifier of the Post
 * @param categoriesIds A list of Category IDs
 */
data class UpdatePostCategoriesCommand(override val id: String, val categoriesIds: List<String?>) : Command<String>(id)

/**
 * A completion of the verify list of Category IDs Command.
 *
 * @param id         An identifier of the Post
 * @param categories A list of Category that had verified
 */
data class CompleteVerifyCategoryIdsCommand(override val id: String, val categories: List<Category?>): Command<String>(id)
