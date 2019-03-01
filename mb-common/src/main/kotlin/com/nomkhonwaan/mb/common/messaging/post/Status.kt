package com.nomkhonwaan.mb.common.messaging.post

/**
 * A status indicating the type of Post.
 * <p>
 * By labeling PUBLISHED, the Post will be seen by everyone in the public.
 * Meanwhile, labeling DRAFT will be seen only its author.
 */
enum class Status {
    DRAFT,
    PUBLISHED
}
