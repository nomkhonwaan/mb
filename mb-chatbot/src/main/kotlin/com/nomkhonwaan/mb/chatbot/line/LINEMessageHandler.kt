package com.nomkhonwaan.mb.chatbot.line

import com.linecorp.bot.client.LineMessagingClient
import com.linecorp.bot.model.ReplyMessage
import com.linecorp.bot.model.event.Event
import com.linecorp.bot.model.event.MessageEvent
import com.linecorp.bot.model.event.message.TextMessageContent
import com.linecorp.bot.model.message.Message
import com.linecorp.bot.spring.boot.annotation.EventMapping
import com.linecorp.bot.spring.boot.annotation.LineMessageHandler
import com.nomkhonwaan.mb.blog.post.FindAllPublishedPostsQuery
import com.nomkhonwaan.mb.blog.post.Post
import org.axonframework.messaging.responsetypes.ResponseTypes
import org.axonframework.queryhandling.QueryGateway

/**
 * A LINE messaging handler.
 * <p>
 * This handler will listen for the message (that sender send to bot via LINE chat application)
 * and decides which message should be replied back to the sender.
 * <p>
 * See more handled messages on [KeywordReplyMessage] class.
 */
@LineMessageHandler
class LINEMessageHandler(
        private val lineMessagingClient: LineMessagingClient,
        private val queryGateway: QueryGateway
) {
    /**
     * Handles text message content that has been sent to the LINE bot.
     *
     * @param event A text message content event
     */
    @EventMapping
    fun handleTextMessageEvent(event: MessageEvent<TextMessageContent>) {
        handleTextContent(event.replyToken, event, event.message)
    }

    /**
     * Decides what message should reply to the sender when receiving their text message.
     *
     * @param replyToken An access token to be used for replying message to the sender
     * @param event      A text message content event
     * @param content    A message content from text message content event
     */
    private fun handleTextContent(replyToken: String, event: Event, content: TextMessageContent) {
        when (content.text) {
            KeywordReplyMessage.RECENT_POSTS.text -> {
                queryGateway
                        .query(
                                FindAllPublishedPostsQuery(0, 5),
                                ResponseTypes.multipleInstancesOf(Post::class.java)
                        )
                        .thenApply {
                            reply(replyToken, RecentPostsFlexMessageSupplier(it).invoke())
                        }
            }
        }
    }

    /**
     * Performs replying message via LINE message client.
     *
     * @param replyToken An access token to be used for replying message to the sender
     * @param message    A message to be sent
     */
    private fun reply(replyToken: String, message: Message) {
        reply(replyToken, listOf(message))
    }

    /**
     * Performs replying message via LINE messaging client.
     *
     * @param replyToken An access token to be used for replying message to the sender
     * @param messages   A list of message to be sent
     */
    private fun reply(replyToken: String, messages: List<Message>) {
        lineMessagingClient.replyMessage(ReplyMessage(replyToken, messages))
    }
}