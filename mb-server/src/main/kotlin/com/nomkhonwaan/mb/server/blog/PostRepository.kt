package com.nomkhonwaan.mb.server.blog

import org.springframework.data.domain.Sort
import org.springframework.data.mongodb.repository.MongoRepository
import org.springframework.data.mongodb.repository.Query
import org.springframework.stereotype.Repository

@Repository
interface PostRepository : MongoRepository<Post, String> {
    /**
     * Return a list of posts that belong to the author.
     */
    @Query("{ 'author.id': ?0 }")
    fun findAllByAuthorId(
            authorId: String,
            sort: Sort = Sort.by(Sort.Direction.DESC, "createdAt")
    ): List<Post?>

    /**
     * Return a list of posts filtered by status.
     */
    @Query("{ status: ?0 }")
    fun findAllByStatus(
            status: Status,
            sort: Sort = Sort.by(Sort.Direction.DESC, "createdAt")
    ): List<Post?>

    /**
     * Return a list of posts that belong to the author and filtered by status.
     */
    @Query("{ 'author.id': ?0, status: ?1 }")
    fun findAllByStatusAndAuthorId(
            status: Status,
            authorId: String,
            sort: Sort = Sort.by(Sort.Direction.DESC, "createdAt")
    ): List<Post?>

    /**
     * Return a list of posts that belong to the category filtered by status.
     */
    @Query("{ 'categories.id': ?0, status: ?1 }")
    fun findAllByStatusAndCategoryId(
            status: Status,
            categoryId: String,
            sort: Sort = Sort.by(Sort.Direction.DESC, "createdAt")
    ): List<Post?>
}
