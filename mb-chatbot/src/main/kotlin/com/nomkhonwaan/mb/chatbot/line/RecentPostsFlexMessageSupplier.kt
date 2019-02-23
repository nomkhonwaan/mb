package com.nomkhonwaan.mb.chatbot.line

import com.linecorp.bot.model.action.URIAction
import com.linecorp.bot.model.message.FlexMessage
import com.linecorp.bot.model.message.flex.component.Box
import com.linecorp.bot.model.message.flex.component.Button
import com.linecorp.bot.model.message.flex.component.Image
import com.linecorp.bot.model.message.flex.component.Text
import com.linecorp.bot.model.message.flex.container.Bubble
import com.linecorp.bot.model.message.flex.unit.FlexFontSize
import com.linecorp.bot.model.message.flex.unit.FlexLayout
import com.nomkhonwaan.mb.blog.post.Post
import com.nomkhonwaan.mb.common.function.Supplier
import java.time.format.DateTimeFormatter

/**
 * Supplies a reply message for the [KeywordReplyMessage.RECENT_POSTS] message.
 */
class RecentPostsFlexMessageSupplier(private val posts: List<Post?>) : Supplier<FlexMessage> {
    override fun invoke(): FlexMessage {
        val bubbleBuilder: Bubble.BubbleBuilder = Bubble.builder()
                .header(createHeaderBlock())

        posts.filterNotNull().forEachIndexed { index, post: Post ->
            if (index == 0) {
                bubbleBuilder.hero(createHeroBlock(post))
            } else {

            }
        }

        bubbleBuilder.footer(createFooterBlock())

        return FlexMessage(KeywordReplyMessage.RECENT_POSTS.text, bubbleBuilder.build())
    }

    /**
     * Returns a FlexMessage header box.
     */
    private fun createHeaderBlock(): Box {
        return Box.builder()
                .layout(FlexLayout.HORIZONTAL)
                .contents(listOf(
                        Text.builder()
                                .text("RECENT POSTS")
                                .weight(Text.TextWeight.BOLD)
                                .color("#333333")
                                .size(FlexFontSize.SM)
                                .build()
                ))
                .build()
    }

    /**
     * Returns a FlexMessage hero box.
     */
    private fun createHeroBlock(post: Post): Image {
        val dateTimeFormatter: DateTimeFormatter = DateTimeFormatter.ofPattern("yyyy/MM/dd")

        return Image.builder()
                .url("https://placekitten.com/600/390")
                .size(Image.ImageSize.FULL_WIDTH)
                .aspectRatio(Image.ImageAspectRatio.R20TO13)
                .aspectMode(Image.ImageAspectMode.Cover)
                .action(URIAction(post.title,
                        "https://www.nomkhonwaan.com/${post.publishedAt!!.format(dateTimeFormatter)}/${post.slug}"))
                .build()
    }

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
