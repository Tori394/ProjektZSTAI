package com.example.demo.security;

import com.example.demo.controller.AuthController;
import com.example.demo.dto.AuthResponse;
import com.example.demo.dto.LoginRequest;
import com.example.demo.dto.RegisterRequest;
import com.example.demo.service.AuthService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class AuthControllerTests {

    @Mock
    private AuthService authService;

    @InjectMocks
    private AuthController authController;

    // --- REJESTRACJA ---

    @Test
    void shouldReturnOkWhenRegistrationIsSuccessful() {
        // Given
        RegisterRequest request = new RegisterRequest();
        request.setUsername("testuser");
        request.setPassword("password123");
        request.setEmail("test@test.com");

        doNothing().when(authService).register(request);

        // When
        ResponseEntity<String> response = authController.register(request);

        // Then
        assertNotNull(response);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("User registered", response.getBody());

        verify(authService, times(1)).register(request);
    }

    @Test
    void shouldReturnBadRequestWhenRegistrationFails() {
        // Given
        RegisterRequest request = new RegisterRequest();
        request.setUsername("existinguser");

        String errorMessage = "Użytkownik o podanej nazwie już istnieje!";
        doThrow(new RuntimeException(errorMessage)).when(authService).register(request);

        // When
        ResponseEntity<String> response = authController.register(request);

        // Then
        assertNotNull(response);
        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertEquals(errorMessage, response.getBody());

        verify(authService, times(1)).register(request);
    }

    // --- LOGOWANIE ---

    @Test
    void shouldReturnTokenWhenLoginIsSuccessful() {
        // Given
        LoginRequest request = new LoginRequest();

        String fakeToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.fake.token";
        when(authService.login(request)).thenReturn(fakeToken);

        // When
        ResponseEntity<AuthResponse> response = authController.login(request);

        // Then
        assertNotNull(response);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals(fakeToken, response.getBody().getToken());

        verify(authService, times(1)).login(request);
    }
}