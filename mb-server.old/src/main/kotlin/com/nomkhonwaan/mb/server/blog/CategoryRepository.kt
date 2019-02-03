package com.nomkhonwaan.mb.server.blog

import org.springframework.data.mongodb.repository.MongoRepository
import org.springframework.stereotype.Repository

@Repository
interface CategoryRepository : MongoRepository<Category, String>
