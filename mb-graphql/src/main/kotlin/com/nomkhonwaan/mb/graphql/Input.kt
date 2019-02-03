package com.nomkhonwaan.mb.graphql

/**
 * An abstraction class of the GraphQL Input.
 * <p>
 * All Input classes should inheritance from this class
 * for ensuring an identifier is already defined.
 *
 * @param id An Input identifier
 */
abstract class Input<T : Any>(open val id: T)
