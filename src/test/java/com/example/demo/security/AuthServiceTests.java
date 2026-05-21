package com.example.demo.security;

import com.example.demo.dto.LoginRequest;
import com.example.demo.dto.RegisterRequest;
import com.example.demo.model.Role;
import com.example.demo.model.User;
import com.example.demo.security.JwtUtil;
import com.example.demo.service.AuthService;
import com.example.demo.service.UserService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class AuthServiceTests {

    @Mock
    private UserService userService;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private AuthenticationManager authenticationManager;

    @Mock
    private JwtUtil jwtUtil;

    @InjectMocks
    private AuthService authService;

    // --- REJESTRACJA ---

    @Test
    void shouldRegisterUserSuccessfullyWithProvidedRole() {
        // Given
        RegisterRequest request = new RegisterRequest();
        request.setUsername("nowy_user");
        request.setPassword("supertajnehaslo");
        request.setEmail("test@test.pl");
        request.setRole(Role.ADMIN);

        when(userService.getByUsername("nowy_user")).thenReturn(Optional.empty());
        when(passwordEncoder.encode("supertajnehaslo")).thenReturn("zaszyfrowane_haslo");

        when(userService.createUser(any(User.class))).thenReturn(new User());

        // When
        authService.register(request);

        // Then
        verify(userService, times(1)).getByUsername("nowy_user");
        verify(passwordEncoder, times(1)).encode("supertajnehaslo");

        ArgumentCaptor<User> userCaptor = ArgumentCaptor.forClass(User.class);
        verify(userService, times(1)).createUser(userCaptor.capture());

        User capturedUser = userCaptor.getValue();
        assertEquals("nowy_user", capturedUser.getUsername());
        assertEquals("zaszyfrowane_haslo", capturedUser.getPassword());
        assertEquals("test@test.pl", capturedUser.getEmail());
        assertEquals(Role.ADMIN, capturedUser.getRole());
    }

    @Test
    void shouldRegisterUserWithDefaultUserRoleWhenRoleIsNull() {
        // Given
        RegisterRequest request = new RegisterRequest();
        request.setUsername("zwykly_user");
        request.setPassword("haslo123");
        request.setEmail("user@test.pl");
        request.setRole(null);

        when(userService.getByUsername("zwykly_user")).thenReturn(Optional.empty());
        when(passwordEncoder.encode("haslo123")).thenReturn("hash123");
        when(userService.createUser(any(User.class))).thenReturn(new User());

        // When
        authService.register(request);

        // Then
        ArgumentCaptor<User> userCaptor = ArgumentCaptor.forClass(User.class);
        verify(userService).createUser(userCaptor.capture());

        assertEquals(Role.USER, userCaptor.getValue().getRole());
    }

    @Test
    void shouldThrowExceptionWhenRegisteringExistingUsername() {
        // Given
        RegisterRequest request = new RegisterRequest();
        request.setUsername("zajety_user");

        // Symulujemy, że serwis zwraca już jakiegoś użytkownika z bazy
        when(userService.getByUsername("zajety_user")).thenReturn(Optional.of(new User()));

        // When & Then
        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            authService.register(request);
        });

        assertEquals("Użytkownik o takim loginie już istnieje!", exception.getMessage());

        verify(userService, times(1)).getByUsername("zajety_user");
        // Sprawdzamy, czy w przypadku błędu na pewno nie próbujemy szyfrować hasła ani tworzyć użytkownika
        verify(passwordEncoder, never()).encode(anyString());
        verify(userService, never()).createUser(any(User.class));
    }

    // --- LOGOWANIE ---

    @Test
    void shouldLoginSuccessfullyAndReturnToken() {
        // Given
        LoginRequest request = new LoginRequest();
        request.setUsername("test_user");
        request.setPassword("poprawne_haslo");

        User existingUser = new User();
        existingUser.setUsername("test_user");
        existingUser.setRole(Role.USER);

        Authentication authentication = mock(Authentication.class);

        when(authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken("test_user", "poprawne_haslo")
        )).thenReturn(authentication);

        when(userService.getByUsername("test_user")).thenReturn(Optional.of(existingUser));
        when(jwtUtil.generateToken("test_user", "USER")).thenReturn("wygenerowany.token.jwt");

        // When
        String token = authService.login(request);

        // Then
        assertNotNull(token);
        assertEquals("wygenerowany.token.jwt", token);

        verify(authenticationManager, times(1))
                .authenticate(new UsernamePasswordAuthenticationToken("test_user", "poprawne_haslo"));
        verify(userService, times(1)).getByUsername("test_user");
        verify(jwtUtil, times(1)).generateToken("test_user", "USER");
    }

    @Test
    void shouldThrowExceptionWhenLoginFailsWithBadCredentials() {
        // Given
        LoginRequest request = new LoginRequest();
        request.setUsername("test_user");
        request.setPassword("zle_haslo");

        when(authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken("test_user", "zle_haslo")
        )).thenThrow(new BadCredentialsException("Bad credentials"));

        // When & Then
        assertThrows(BadCredentialsException.class, () -> {
            authService.login(request);
        });

        verify(authenticationManager, times(1))
                .authenticate(new UsernamePasswordAuthenticationToken("test_user", "zle_haslo"));

        verify(userService, never()).getByUsername(anyString());
        verify(jwtUtil, never()).generateToken(anyString(), anyString());
    }
}