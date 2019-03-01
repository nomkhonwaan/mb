package com.nomkhonwaan.mb.common.messaging.post

import com.nomkhonwaan.mb.common.cqrs.Command
import com.nomkhonwaan.mb.common.messaging.category.Category

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
 * A Post status updating Command.
 *
 * @param id     An identifier of the Post
 * @param status A status of the Post
 */
data class UpdatePostStatusCommand(override val id: String, val status: Status): Command<String>(id)

/**
 * A Post content updating Command.
 *
 * @param id       An identifier of the Post
 * @param markdown A content of the Post in the markdown syntax
 */
data class UpdatePostContentCommand(override val id: String, val markdown: String): Command<String>(id)

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
