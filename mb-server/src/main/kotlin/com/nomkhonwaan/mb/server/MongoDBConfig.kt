package com.nomkhonwaan.mb.server

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.core.convert.converter.Converter
import org.springframework.data.auditing.DateTimeProvider
import org.springframework.data.mongodb.config.EnableMongoAuditing
import org.springframework.data.mongodb.core.convert.MongoCustomConversions
import java.time.OffsetDateTime
import java.time.ZoneId
import java.time.ZonedDateTime
import java.util.*

@Configuration
@EnableMongoAuditing(dateTimeProviderRef = "auditingDateTimeProvider")
class MongoDBConfig {
    @Bean(name = ["auditingDateTimeProvider"])
    fun dateTimeProvider(): DateTimeProvider {
        return DateTimeProvider { Optional.of(OffsetDateTime.now()) }
    }

    @Bean
    fun mongoCustomConversions(): MongoCustomConversions {
        return MongoCustomConversions(listOf(
                Converter<Date, ZonedDateTime> {
                    ZonedDateTime.ofInstant(it.toInstant(), ZoneId.of("Asia/Bangkok"))
                },
                Converter<ZonedDateTime, Date> {
                    Date.from(it.toInstant())
                }
        ))
    }
}
