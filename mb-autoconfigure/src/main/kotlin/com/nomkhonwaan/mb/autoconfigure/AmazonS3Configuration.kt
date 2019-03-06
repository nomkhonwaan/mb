package com.nomkhonwaan.mb.autoconfigure

import com.amazonaws.auth.AWSStaticCredentialsProvider
import com.amazonaws.auth.BasicAWSCredentials
import com.amazonaws.regions.Regions
import com.amazonaws.services.s3.AmazonS3
import com.amazonaws.services.s3.AmazonS3ClientBuilder
import org.springframework.beans.factory.annotation.Value
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

/**
 * An auto-configure of the Amazon S3.
 */
@Configuration
class AmazonS3Configuration {
    /**
     * An access key that has Amazon S3 permission attached.
     */
    @Value("\${aws.access-key}")
    private lateinit var accessKey: String

    /**
     * A secret key pair of the access key.
     */
    @Value("\${aws.secret-key}")
    private lateinit var secretKey: String

    /**
     * Provides an Amazon S3 client.
     * <p>
     * The client should have full access permission for manipulating all Amazon S3 objects.
     */
    @Bean
    @ConditionalOnMissingBean
    fun amazonS3(): AmazonS3 {
        return AmazonS3ClientBuilder.standard()
                .withCredentials(AWSStaticCredentialsProvider(BasicAWSCredentials(accessKey, secretKey)))
                .withRegion(Regions.AP_SOUTHEAST_1)
                .build()
    }
}
