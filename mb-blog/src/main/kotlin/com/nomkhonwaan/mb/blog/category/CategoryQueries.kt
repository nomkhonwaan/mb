package com.nomkhonwaan.mb.blog.category

import com.nomkhonwaan.mb.common.cqrs.Query

/**
 * Finds all categories Query.
 */
class FindAllCategoriesQuery : Query()

/**
 * Finds all published Posts that belong to the category Query.
 *
 * @param category An object of the Category
 * @param offset   An offset of the list of published Posts to be queried
 * @param limit    A maximum number of the Posts to be queried
 */
data class FindAllPublishedPostsBelongingTo(val categoryId: String, val offset: Int, val limit: Int) : Query()
