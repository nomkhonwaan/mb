package com.nomkhonwaan.mb.blog.post

import com.nomkhonwaan.mb.common.cqrs.Command

/**
 * A Post creation Command.
 *
 * @param id An identifier of the Post
 */
data class CreatePostCommand(override val id: String, val authorId: String) : Command<String>(id)

/**
 * A Post title update Command.
 *
 * @param id    An identifier of the Post
 * @param title A title of the Post
 */
data class UpdatePostTitleCommand(override val id: String, val title: String) : Command<String>(id)
