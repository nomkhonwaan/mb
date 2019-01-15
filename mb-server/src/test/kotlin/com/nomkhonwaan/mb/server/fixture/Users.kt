package com.nomkhonwaan.mb.server.fixture

import com.nomkhonwaan.mb.server.auth.User
import com.nomkhonwaan.mb.server.auth.UserEmail
import org.bson.types.ObjectId

val users: List<User> = listOf(
        User(
                id = ObjectId.get().toHexString(),
                emails = listOf(UserEmail(email = "foo@foo.test", isPrimary = true))
        ),
        User(
                id = ObjectId.get().toHexString(),
                emails = listOf(
                        UserEmail(email = "bar@bar.test", isPrimary = true),
                        UserEmail(email = "baz@baz.test")
                )
        ),
        User(
                emails = listOf(
                        UserEmail(email = "qux@qux.test", isPrimary = true)
                )
        )
)
