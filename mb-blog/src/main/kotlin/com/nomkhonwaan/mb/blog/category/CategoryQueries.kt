package com.nomkhonwaan.mb.blog.category

/**
 * Finds all categories Query.
 */
class FindAllCategoriesQuery

/**
 * Finds a single Category by its ID Query.
 */
data class FindCategoryByIdQuery(val id: String)

/**
 * Finds all published Posts that belong to the category Query.
 *
 * @param id     An identifier of the Category
 * @param offset An offset of the list of published Posts to be queried
 * @param limit  A maximum number of the Posts to be queried
 */
data class FindAllPublishedPostsBelongingTo(val id: String, val offset: Int, val limit: Int)
