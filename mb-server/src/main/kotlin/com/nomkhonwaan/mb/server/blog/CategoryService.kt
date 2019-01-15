package com.nomkhonwaan.mb.server.blog

interface CategoryService {
    /**
     * Return a list of categories.
     */
    fun findAll(): List<Category?>
}
