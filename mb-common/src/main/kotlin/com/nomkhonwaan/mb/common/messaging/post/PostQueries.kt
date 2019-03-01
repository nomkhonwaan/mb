package com.nomkhonwaan.mb.common.messaging.post

/**
 * Finds a single Post by its ID Query.
 *
 * @param id An identifier of the Post
 */
data class FindPostByIdQuery(val id: String)

/**
 * Finds a single Post that belongs to the author by its ID Query.
 *
 * @param id       An identifier of the Post
 * @param authorId An identifier of the author
 */
data class FindOwnPostByIdQuery(val id: String, val authorId: String)

/**
 * Finds all published Posts Query.
 *
 * @param offset An offset of the list of published Posts to be queried
 * @param limit  A maximum number of the Posts to be queried
 */
data class FindAllPublishedPostsQuery(val offset: Int, val limit: Int)

/**
 * Finds all draft Posts Posts Query.
 *
 * @param authorId An identifier of the author
 * @param offset   An offset of the list of draft Posts to be queried
 * @param limit    A maximum number of the Posts to be queried
 */
data class FindAllDraftPostsQuery(val authorId: String, val offset: Int, val limit: Int)
