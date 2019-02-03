package com.nomkhonwaan.mb.autoconfigure

import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.core.convert.converter.Converter
import org.springframework.data.mongodb.core.convert.MongoCustomConversions
import java.time.ZoneId
import java.time.ZonedDateTime
import java.util.*

/**
 * An auto-configure of the Spring Data MongoDB.
 */
@Configuration
class MongoConfiguration {
    /**
     * Registers custom conversions for the MongoDB field type.
     * <p>
     * The first conversion is from [java.util.Date] to [java.time.ZonedDateTime]
     * which uses Asia/Bangkok as a default timezone.
     * <p>
     * The second conversion is from [java.time.ZonedDateTime] to [java.util.Date].
     */
    @ConditionalOnMissingBean
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
