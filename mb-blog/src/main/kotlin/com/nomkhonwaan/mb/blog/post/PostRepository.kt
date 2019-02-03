package com.nomkhonwaan.mb.blog.post

import org.springframework.data.domain.Pageable
import org.springframework.data.mongodb.repository.MongoRepository
import org.springframework.data.mongodb.repository.Query
import org.springframework.stereotype.Repository

/**
 * A CRUD repository of the Post.
 * <p>
 * An extended repository of [MongoRepository] for handling CRUD of the Post.
 */
@Repository
interface PostRepository : MongoRepository<Post, String> {
    /**
     * Returns a list of Posts filtered by its status.
     *
     * @param status   A status of the Post
     * @param pageable A pagination configuration
     */
    @Query("{ status: ?0 }")
    fun findAllByStatus(status: Status, pageable: Pageable? = null): List<Post?>

    /**
     * Return a list of Posts that belong to the author filtered by its status.
     *
     * @param authorId An identifier of the author
     * @param status   A status of the Post
     * @param pageable A pagination configuration
     */
    @Query("{ authorId: ?0, status: ?1 }")
    fun findAllByAuthorIdAndStatus(authorId: String, status: Status, pageable: Pageable? = null): List<Post?>

    /**
     * Return a list of Posts that belong to the Category filtered by its status.
     *
     * @param categoryId An identifier of the Category
     * @param status     A status of the Post
     * @param pageable   A pagination configuration
     */
    @Query("{ 'categories.id': ?0, status: ?1 }")
    fun findAllByCategoryIdAndStatus(categoryId: String, status: Status, pageable: Pageable? = null): List<Post?>
}
