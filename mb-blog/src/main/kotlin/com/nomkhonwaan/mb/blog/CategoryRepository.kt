package com.nomkhonwaan.mb.blog

import org.springframework.data.mongodb.repository.MongoRepository

/**
 * A CRUD repository of the Category.
 * <p>
 * An extended repository of [MongoRepository] for handling CRUD of the Category.
 */
interface CategoryRepository : MongoRepository<Category, String>
