package com.nomkhonwaan.mb.server

import com.amazonaws.auth.AWSStaticCredentialsProvider
import com.amazonaws.auth.BasicAWSCredentials
import com.amazonaws.regions.Regions
import com.amazonaws.services.s3.AmazonS3
import com.amazonaws.services.s3.AmazonS3ClientBuilder
import com.nomkhonwaan.mb.server.file.AttachmentRepository
import com.nomkhonwaan.mb.server.file.StorageService
import com.nomkhonwaan.mb.server.file.internal.StorageServiceImpl
import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
class AmazonWebServiceConfig {
    @Value("\${aws.access-key}")
    private lateinit var accessKey: String

    @Value("\${aws.secret-key}")
    private lateinit var secretKey: String

    @Value("\${aws.s3.default-bucket-name}")
    private lateinit var defaultBucketName: String

    @Bean
    fun amazonS3(): AmazonS3 {
        return AmazonS3ClientBuilder
                .standard()
                .withCredentials(AWSStaticCredentialsProvider(BasicAWSCredentials(accessKey, secretKey)))
                .withRegion(Regions.AP_SOUTHEAST_1)
                .build()
    }

    @Bean
    fun storageService(attachmentRepository: AttachmentRepository): StorageService {
        return StorageServiceImpl(amazonS3(), defaultBucketName, attachmentRepository)
    }
}
