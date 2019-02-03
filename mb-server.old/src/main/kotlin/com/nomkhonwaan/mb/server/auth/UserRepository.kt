package com.nomkhonwaan.mb.server.auth

import org.springframework.data.mongodb.repository.MongoRepository
import org.springframework.data.mongodb.repository.Query
import org.springframework.stereotype.Repository

@Repository
interface UserRepository : MongoRepository<User, String> {
    /**
     * Find a single user by their email.
     */
    @Query("{ emails: { \$elemMatch: { email: ?0 } } }")
    fun findByEmail(email: String): User?
}
