package com.nomkhonwaan.mb.blog.post

import com.nomkhonwaan.mb.common.cqrs.Query

/**
 * Finds a single Post by its ID Query.
 *
 * @param id An identifier of the Post
 */
data class FindPostByIDQuery(val id: String) : Query()

/**
 * Finds a single Post that belongs to the author by its ID Query.
 *
 * @param id       An identifier of the Post
 * @param authorId An identifier of the author
 */
data class FindOwnPostByIDQuery(val id: String, val authorId: String): Query()

/**
 * Finds all published Posts Query.
 *
 * @param offset An offset of the list of published Posts to be queried
 * @param limit  A maximum number of the Posts to be queried
 */
data class FindAllPublishedPostsQuery(val offset: Int, val limit: Int) : Query()

/**
 * Finds all draft Posts Posts Query.
 *
 * @param authorId An identifier of the author
 * @param offset   An offset of the list of draft Posts to be queried
 * @param limit    A maximum number of the Posts to be queried
 */
data class FindAllDraftPostsQuery(val authorId: String, val offset: Int, val limit: Int): Query()
