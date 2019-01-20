package com.nomkhonwaan.mb.server.blog

import com.nomkhonwaan.mb.server.auth.User

interface PostService {
    /**
     * Return a list of posts filtered by its status.
     */
    fun findAllByStatus(status: Status): List<Post?>

    /**
     * Return a list of posts that belong to the author and filtered by its status.
     */
    fun findAllByStatus(status: Status, author: User): List<Post?>

    /**
     * Return a list of posts that belong to the category and filtered by its status.
     */
    fun findAllByStatus(status: Status, category: Category): List<Post?>

    /**
     * Return a single post by its ID.
     */
    fun findOneById(id: String): Post?

    /**
     * Return a single post that belongs to the author by its ID.
     */
    fun findOneById(id: String, author: User): Post?

    /**
     * Return a empty post with DRAFT status.
     */
    fun create(author: User): Post

    /**
     * Update a title of the post.
     */
    fun updateTitle(post: Post, title: String): Post

    /**
     * Update a status of the post.
     */
    fun updateStatus(post: Post, status: Status): Post

    /**
     * Update a content of the post.
     */
    fun updateContent(post: Post, markdown: String): Post
}
