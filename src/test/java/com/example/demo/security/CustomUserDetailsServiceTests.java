package com.example.demo.security;

import com.example.demo.model.Role;
import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class CustomUserDetailsServiceTests {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private CustomUserDetailsService userDetailsService;

    //HAPPY PATH

    @Test
    void shouldLoadUserWhenUsernameExists() {
        // Given
        String username = "test_user";
        User domainUser = new User();
        domainUser.setUsername(username);
        domainUser.setPassword("zaszyfrowane_haslo_123");
        domainUser.setRole(Role.USER);

        when(userRepository.findByUsername(username)).thenReturn(Optional.of(domainUser));

        // When
        UserDetails result = userDetailsService.loadUserByUsername(username);

        // Then
        assertNotNull(result);
        assertEquals(username, result.getUsername());
        assertEquals("zaszyfrowane_haslo_123", result.getPassword());

        boolean hasUserRole = result.getAuthorities().stream()
                .anyMatch(grantedAuthority -> grantedAuthority.getAuthority().equals("ROLE_USER"));

        assertTrue(hasUserRole, "Użytkownik powinien posiadać rolę ROLE_USER");

        verify(userRepository, times(1)).findByUsername(username);
    }

    //NEGATIVE PATH

    @Test
    void shouldThrowUsernameNotFoundExceptionWhenUserDoesNotExist() {
        // Given
        String nonExistingUsername = "nieznany_user";
        when(userRepository.findByUsername(nonExistingUsername)).thenReturn(Optional.empty());

        // When & Then
        UsernameNotFoundException exception = assertThrows(UsernameNotFoundException.class, () -> {
            userDetailsService.loadUserByUsername(nonExistingUsername);
        });

        assertEquals("User not found", exception.getMessage());
        verify(userRepository, times(1)).findByUsername(nonExistingUsername);
    }
}