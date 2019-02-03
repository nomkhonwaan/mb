package com.nomkhonwaan.mb.blog

import org.springframework.data.domain.Pageable
import org.springframework.data.mongodb.repository.MongoRepository
import org.springframework.data.mongodb.repository.Query
import org.springframework.stereotype.Repository

/**
 * A CRUD repository of the Post.
 * <p>
 * An extended reactive repository of MongoDB for the Post.
 */
@Repository
interface PostRepository : MongoRepository<Post, String> {
    /**
     * Returns a list of Posts filtered by its status.
     *
     * @param status   A status of the Post to be filtered with
     * @param pageable A pagination configuration
     */
    @Query("{ status: ?0 }")
    fun findAll(status: Status, pageable: Pageable? = null): List<Post?>

    /**
     * Return a list of Posts that belong to the author filtered by its status.
     *
     * @param authorId An identifier of the author
     * @param pageable A pagination configuration
     */
    @Query("{ authorId: ?0, status: ?1 }")
    fun findAll(authorId: String, status: Status, pageable: Pageable? = null): List<Post?>
}
