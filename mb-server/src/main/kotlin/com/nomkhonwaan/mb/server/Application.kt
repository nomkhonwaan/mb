package com.nomkhonwaan.mb.server

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.context.annotation.ComponentScan

@ComponentScan(basePackages = [
    "com.nomkhonwaan.mb.autoconfigure",
    "com.nomkhonwaan.mb.auth",
    "com.nomkhonwaan.mb.blog",
    "com.nomkhonwaan.mb.graphql"
])
@SpringBootApplication
class Application

fun main(args: Array<String>) {
    runApplication<Application>(*args)
}
