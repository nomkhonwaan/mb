package com.nomkhonwaan.mb.server

import com.nomkhonwaan.mb.server.auth.User
import com.nomkhonwaan.mb.server.auth.UserRepository
import com.nomkhonwaan.mb.server.fixture.users
import org.junit.jupiter.api.Assertions
import org.junit.jupiter.api.extension.ExtendWith
import org.mockito.Mockito.`when`
import org.mockito.Mockito.mock
import org.spekframework.spek2.Spek
import org.spekframework.spek2.style.specification.describe
import org.springframework.test.context.junit.jupiter.SpringExtension

@ExtendWith(SpringExtension::class)
object ResourceServerConfigSpec : Spek({
    val userRepository: UserRepository = mock(UserRepository::class.java)
    val resourceServerConfig = ResourceServerConfig(userRepository)

    describe("principalExtractor()") {
        it("should create a new PrincipalExtractor which overrides extractPrincipal() method") {
            // Given
            val email: String = users[0].emails[0].email
            val map: Map<String, Any> = mapOf("email" to email)
            val expectedResult: User = users[0]
            `when`(userRepository.findByEmail(email)).thenReturn(expectedResult)

            // When
            val result: Any = resourceServerConfig.principalExtractor().extractPrincipal(map)

            // Then
            Assertions.assertEquals(result, expectedResult)
        }
    }
})
