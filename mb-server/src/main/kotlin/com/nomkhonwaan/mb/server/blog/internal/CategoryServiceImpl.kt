package com.nomkhonwaan.mb.server.blog.internal

import com.nomkhonwaan.mb.server.blog.Category
import com.nomkhonwaan.mb.server.blog.CategoryRepository
import com.nomkhonwaan.mb.server.blog.CategoryService
import org.springframework.stereotype.Service

@Service
class CategoryServiceImpl(private val categoryRepository: CategoryRepository) : CategoryService {
    override fun findAll(): List<Category?> {
        return categoryRepository.findAll()
    }
}
