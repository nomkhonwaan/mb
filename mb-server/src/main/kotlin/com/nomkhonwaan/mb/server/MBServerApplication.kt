package com.nomkhonwaan.mb.server

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class MBServerApplication {
    companion object {
        @JvmStatic
        fun main(args: Array<String>) {
            runApplication<MBServerApplication>(*args)
        }
    }
}
