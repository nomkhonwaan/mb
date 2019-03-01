package com.nomkhonwaan.mb.server

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.context.annotation.ComponentScan

@ComponentScan(basePackages = [
    "com.nomkhonwaan.mb.auth",
    "com.nomkhonwaan.mb.autoconfigure",
    "com.nomkhonwaan.mb.blog",
    "com.nomkhonwaan.mb.chatbot",
    "com.nomkhonwaan.mb.graphql",
    "com.nomkhonwaan.mb.notification",
    "com.nomkhonwaan.mb.restful",
    "com.nomkhonwaan.mb.storage"
])
@SpringBootApplication
class Application

fun main(args: Array<String>) {
    runApplication<Application>(*args)
}
