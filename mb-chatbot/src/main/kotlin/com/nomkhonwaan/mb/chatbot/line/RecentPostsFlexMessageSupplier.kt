package com.nomkhonwaan.mb.chatbot.line

import com.linecorp.bot.model.message.FlexMessage
import com.linecorp.bot.model.message.flex.component.Box
import com.linecorp.bot.model.message.flex.component.Text
import com.linecorp.bot.model.message.flex.container.Bubble
import com.linecorp.bot.model.message.flex.unit.FlexFontSize
import com.linecorp.bot.model.message.flex.unit.FlexLayout
import com.nomkhonwaan.mb.common.function.Supplier

/**
 * Supplies a reply message for the [KeywordReplyMessage.RECENT_POSTS] message.
 */
class RecentPostsFlexMessageSupplier : Supplier<FlexMessage> {
    override fun invoke(): FlexMessage {
        val bubble: Bubble = Bubble.builder()
                .header(buildHeaderBox())
                .build()

        return FlexMessage(KeywordReplyMessage.RECENT_POSTS.text, bubble)
    }

    /**
     * Returns a FlexMessage header box.
     */
    private fun buildHeaderBox(): Box {
        return Box.builder()
                .layout(FlexLayout.HORIZONTAL)
                .contents(listOf(
                        Text.builder()
                                .text(KeywordReplyMessage.RECENT_POSTS.text)
                                .weight(Text.TextWeight.BOLD)
                                .color("#333333")
                                .size(FlexFontSize.SM)
                                .build()
                ))
                .build()
    }
}
