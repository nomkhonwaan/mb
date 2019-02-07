package com.nomkhonwaan.mb.blog.post

import com.github.slugify.Slugify
import com.nomkhonwaan.mb.blog.category.Category
import org.axonframework.commandhandling.CommandHandler
import org.axonframework.eventsourcing.EventSourcingHandler
import org.axonframework.modelling.command.AggregateIdentifier
import org.axonframework.modelling.command.AggregateLifecycle
import org.axonframework.spring.stereotype.Aggregate
import org.bson.types.ObjectId
import java.time.ZonedDateTime

/**
 * An aggregation of the Post.
 */
@Aggregate
class PostAggregate() {
    @AggregateIdentifier
    private lateinit var id: String

    /**
     * A title of the Post
     */
    private lateinit var title: String

    /**
     * A valid URL string composes with title and ID
     */
    private lateinit var slug: String

    /**
     * A status of the Post
     */
    private lateinit var status: Status

    /**
     * A datetime that the Post was published
     */
    private var publishedAt: ZonedDateTime? = null

    /**
     * An author ID of the Post
     */
    private lateinit var authorId: String

    /**
     * A list of Categories that the Post belongs to
     */
    private lateinit var categories: List<Category?>

    /**
     * A datetime that the Post was created
     */
    private lateinit var createdAt: ZonedDateTime

    /**
     * A datetime that the Post was updated
     */
    private var updatedAt: ZonedDateTime? = null

    /**
     * A secondary constructor for handle the creation Command.
     *
     * @param command A Command for creating new Post
     */
    @CommandHandler
    constructor(command: CreatePostCommand) : this() {
        AggregateLifecycle.apply(
                PostCreatedEvent(
                        if (command.id.isNotBlank()) command.id else ObjectId.get().toHexString(),
                        Status.DRAFT,
                        command.authorId,
                        listOf()
                )
        )
    }

    /**
     * Handles Post title updating Command.
     *
     * @param command A Command for updating Post title
     */
    @CommandHandler
    fun handle(command: UpdatePostTitleCommand) {
        AggregateLifecycle.apply(
                PostTitleUpdatedEvent(
                        command.id,
                        command.title,
                        "${Slugify().slugify(command.title)}-${command.id}"
                )
        )
    }

    /**
     * Handles Post Categories updating Command.
     * <p>
     * This handler function will trigger list of category IDs verification saga for checking an existing of the category.
     *
     * @param command A Command for updating Post Categories
     */
    @CommandHandler
    fun handle(command: UpdatePostCategoriesCommand) {
        AggregateLifecycle.apply(
                VerifyCategoryIdsStartedEvent(
                        command.id,
                        command.categoriesIds
                )
        )
    }

    /**
     * Handles Post Categories verify completed Command.
     * <p>
     * This handler function will be handled after the list of Category IDs has been verified.
     *
     * @param command A Command for confirm that the list of Category IDs has been verified
     */
    @CommandHandler
    fun handle(command: CompleteVerifyCategoryIdsCommand) {
        AggregateLifecycle.apply(
                PostCategoriesUpdatedEvent(
                        command.id,
                        command.categories
                )
        )
    }

    /**
     * Listens on Post created Event.
     *
     * @param event An Event of the Post creation Command
     */
    @EventSourcingHandler
    fun on(event: PostCreatedEvent) {
        id = event.id
        status = event.status
        authorId = event.authorId
        categories = event.categories
        createdAt = event.createdAt
    }

    /**
     * Listens on Post title updated Event.
     *
     * @param event An Event of the Post title updating Command
     */
    @EventSourcingHandler
    fun on(event: PostTitleUpdatedEvent) {
        id = event.id
        title = event.title
        slug = event.slug
        updatedAt = event.updatedAt
    }

    /**
     * Listens on Post Categories updated Event.
     *
     * @param event An Event of the Post Categories updating Command
     */
    @EventSourcingHandler
    fun on(event: PostCategoriesUpdatedEvent) {
        categories = event.categories
    }
}