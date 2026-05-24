package com.example.demo.security;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.test.util.ReflectionTestUtils;

import static org.junit.jupiter.api.Assertions.*;

public class JwtUtilTests {

    private JwtUtil jwtUtil;

    @BeforeEach
    void setUp() {
        jwtUtil = new JwtUtil();
        ReflectionTestUtils.setField(jwtUtil, "secret", "VG9KZXN0U3VwZXJUYWpueUtsdWN6RG9Qcm9qZWt0dU5hU3R1ZGlhMTIz");
    }

    //HAPPY PATH

    @Test
    void shouldGenerateTokenAndExtractUsernameAndRole() {
        // Given
        String username = "test_admin";
        String role = "ADMIN";

        // When
        String token = jwtUtil.generateToken(username, role);

        String extractedUsername = jwtUtil.extractUsername(token);
        String extractedRole = jwtUtil.extractRole(token);

        // Then
        assertNotNull(token);
        assertFalse(token.isEmpty());

        assertEquals(username, extractedUsername);
        assertEquals(role, extractedRole);
    }

    @Test
    void shouldReturnTrueWhenTokenIsValid() {
        // Given
        String token = jwtUtil.generateToken("zwykly_user", "USER");

        // When
        boolean isValid = jwtUtil.validateToken(token);

        // Then
        assertTrue(isValid, "Zwrócony token powinien być poprawny!");
    }

    //NEGATIVE PATH

    @Test
    void shouldReturnFalseWhenTokenIsInvalid() {
        // Given
        String invalidToken = "to.nie.jest.prawidlowy.token.jwt";

        // When
        boolean isValid = jwtUtil.validateToken(invalidToken);

        // Then
        assertFalse(isValid, "Metoda validateToken powinna zwrócić false dla sfałszowanego tokenu!");
    }

    @Test
    void shouldReturnFalseWhenTokenIsEmpty() {
        // Given
        String emptyToken = "";

        // When
        boolean isValid = jwtUtil.validateToken(emptyToken);

        // Then
        assertFalse(isValid, "Metoda validateToken powinna zwrócić false dla pustego tokenu!");
    }
}