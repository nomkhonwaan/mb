package com.nomkhonwaan.mb.server.blog

import org.springframework.data.mongodb.repository.MongoRepository

interface TagRepository : MongoRepository<Tag, String>
