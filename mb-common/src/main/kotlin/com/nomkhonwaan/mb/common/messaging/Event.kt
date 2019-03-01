package com.nomkhonwaan.mb.common.messaging

/**
 * An abstraction class of the Event.
 * <p>
 * All Event classes should inheritance from this class
 * for ensuring an identifier is already defined.
 *
 * @param id An identifier of the Event
 */
abstract class Event<T : Any>(open val id: T)
