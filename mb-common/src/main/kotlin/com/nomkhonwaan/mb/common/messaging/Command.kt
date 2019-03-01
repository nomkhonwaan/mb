package com.nomkhonwaan.mb.common.messaging

import org.axonframework.modelling.command.TargetAggregateIdentifier

/**
 * An abstraction class of the Command.
 * <p>
 * All Command classes should inheritance from this class
 * for ensuring an aggregate identifier is already defined.
 *
 * @param id An identifier of the Command
 */
abstract class Command<T : Any>(@TargetAggregateIdentifier open val id: T)
