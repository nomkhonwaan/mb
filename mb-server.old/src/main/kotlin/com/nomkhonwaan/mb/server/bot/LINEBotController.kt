package com.nomkhonwaan.mb.server.bot

import com.linecorp.bot.client.LineMessagingClient
import com.linecorp.bot.model.ReplyMessage
import com.linecorp.bot.model.event.MessageEvent
import com.linecorp.bot.model.event.message.TextMessageContent
import com.linecorp.bot.model.message.TextMessage
import com.linecorp.bot.spring.boot.annotation.EventMapping
import com.linecorp.bot.spring.boot.annotation.LineMessageHandler

@LineMessageHandler
class LINEBotController(private val lineMessagingClient: LineMessagingClient) {
    @EventMapping
    fun handleTextMessageEvent(event: MessageEvent<TextMessageContent>) {
        val replyToken: String = event.replyToken
        val message = TextMessage(event.message.text)

        lineMessagingClient
                .replyMessage(ReplyMessage(replyToken, message))
    }
}
