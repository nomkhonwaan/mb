package com.nomkhonwaan.mb.chatbot.line

import com.linecorp.bot.model.action.URIAction
import com.linecorp.bot.model.message.FlexMessage
import com.linecorp.bot.model.message.flex.component.Box
import com.linecorp.bot.model.message.flex.component.Button
import com.linecorp.bot.model.message.flex.component.Image
import com.linecorp.bot.model.message.flex.component.Text
import com.linecorp.bot.model.message.flex.container.Bubble
import com.linecorp.bot.model.message.flex.unit.FlexFontSize
import com.linecorp.bot.model.message.flex.unit.FlexGravity
import com.linecorp.bot.model.message.flex.unit.FlexLayout
import com.linecorp.bot.model.message.flex.unit.FlexMarginSize
import com.nomkhonwaan.mb.blog.post.Post
import com.nomkhonwaan.mb.common.function.Supplier
import java.time.format.DateTimeFormatter

/**
 * Supplies a reply message for the [KeywordReplyMessage.RECENT_POSTS] message.
 * <p>
 * This class might be failed if the size of the list of Posts does not equal five.
 */
class RecentPostsFlexMessageSupplier(private val posts: List<Post?>) : Supplier<FlexMessage> {
    companion object {
        /**
         * Returns a URI of the Post which composes with [Post.publishedAt] or [Post.createdAt] and [Post.slug].
         */
        private fun Post.buildUri(): String {
            val dateTimeFormatter: DateTimeFormatter = DateTimeFormatter.ofPattern("yyyy/MM/dd")
            val date = this.publishedAt ?: this.createdAt

            return "${date.format(dateTimeFormatter)}/${this.slug}"
        }
    }

    override fun invoke(): FlexMessage {
        val bubbleBuilder: Bubble.BubbleBuilder = Bubble.builder()
                .header(createHeaderBlock())

        posts.filterNotNull().also {
            bubbleBuilder.hero(createHeroBlock(it[0]))
            bubbleBuilder.body(createBodyBlock(it.slice(1 until it.size)))
        }

        bubbleBuilder.footer(createFooterBlock())

        return FlexMessage(KeywordReplyMessage.RECENT_POSTS.text, bubbleBuilder.build())
    }

    /**
     * Creates and returns a header block of the FlexMessage.
     */
    private fun createHeaderBlock(): Box {
        return Box.builder()
                .layout(FlexLayout.HORIZONTAL)
                .contents(listOf(
                        Text.builder()
                                .text("RECENT POSTS")
                                .color("#333333")
                                .size(FlexFontSize.SM)
                                .weight(Text.TextWeight.BOLD)
                                .build()
                ))
                .build()
    }

    /**
     * Creates and returns a hero block (cover image) of the FlexMessage.
     */
    private fun createHeroBlock(post: Post): Image {
        return Image.builder()
                // TODO: Replace with actual Post's featured image
                .url("https://placekitten.com/600/390")
                .action(URIAction(post.title?.substring(0, 40),
                        "https://www.nomkhonwaan.com/${post.buildUri()}"))
                .aspectMode(Image.ImageAspectMode.Cover)
                .aspectRatio(Image.ImageAspectRatio.R20TO13)
                .size(Image.ImageSize.FULL_WIDTH)
                .build()
    }

    /**
     * Creates and returns a body block of the FlexMessage.
     */
    private fun createBodyBlock(posts: List<Post>): Box {
        return Box.builder()
                .layout(FlexLayout.HORIZONTAL)
                .spacing(FlexMarginSize.MD)
                .contents(listOf(
                        createLeftBodyBlock(posts),
                        createRightBodyBlock(posts)
                ))
                .build()
    }

    /**
     * Creates and returns a left body block.
     * <p>
     * The left body block will create a small thumbnail from the second and the fourth Posts.
     */
    private fun createLeftBodyBlock(posts: List<Post>): Box {
        return Box.builder()
                .layout(FlexLayout.VERTICAL)
                .flex(1)
                .contents(listOf(
                        Image.builder()
                                // TODO: Replace with actual Post's featured image
                                .url("https://placekitten.com/160/107")
                                .action(URIAction(posts[0].title?.substring(0, 40),
                                        "https://www.nomkhonwaan.com/${posts[0].buildUri()}"))
                                .aspectMode(Image.ImageAspectMode.Cover)
                                .aspectRatio(Image.ImageAspectRatio.R4TO3)
                                .gravity(FlexGravity.BOTTOM)
                                .size(Image.ImageSize.SM)
                                .build(),
                        Image.builder()
                                // TODO: Replace with actual Post's featured image
                                .url("https://placekitten.com/160/107")
                                .action(URIAction(posts[2].title?.substring(0, 40),
                                        "https://www.nomkhonwaan.com/${posts[2].buildUri()}"))
                                .aspectMode(Image.ImageAspectMode.Cover)
                                .aspectRatio(Image.ImageAspectRatio.R4TO3)
                                .margin(FlexMarginSize.MD)
                                .size(Image.ImageSize.SM)
                                .build()
                ))
                .build()
    }

    /**
     * Creates and returns a right body block.
     * <p>
     * The right body block will create a small text from the second until the fifth Posts.
     */
    private fun createRightBodyBlock(posts: List<Post>): Box {
        return Box.builder()
                .layout(FlexLayout.VERTICAL)
                .flex(2)
                .contents(posts.mapIndexed { index: Int, post: Post ->
                    Text.builder()
                            .text(post.title)
                            .action(URIAction(post.title?.substring(0, 40),
                                    "https://www.nomkhonwaan.com/${post.buildUri()}"))
                            .flex(if (index == 0 || index == posts.size - 1) 1 else 2)
                            .gravity(
                                    when (index) {
                                        0 -> FlexGravity.TOP
                                        posts.size - 1 -> FlexGravity.BOTTOM
                                        else -> FlexGravity.CENTER
                                    }
                            )
                            .size(FlexFontSize.XS)
                            .build()
                })
                .build()
    }

    /**
     * Creates and returns a footer block of the FlexMessage.
     */
    private fun createFooterBlock(): Box {
        return Box.builder()
                .layout(FlexLayout.HORIZONTAL)
                .contents(listOf(
                        Button.builder()
                                .action(URIAction("More", "https://www.nomkhonwaan.com"))
                                .build()
                ))
                .build()
    }
}
