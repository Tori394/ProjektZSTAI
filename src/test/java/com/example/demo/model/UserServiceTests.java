package com.example.demo.model;

import com.example.demo.repository.UserRepository;
import com.example.demo.service.UserService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class UserServiceTests {

    @Mock
    private UserRepository repository;

    @InjectMocks
    private UserService service;

    //HAPPY PATH

    @Test
    void shouldReturnUserWhenUsernameExists() {
        // Given
        String username = "istniejacy_user";
        User expectedUser = new User();
        expectedUser.setUsername(username);
        expectedUser.setEmail("user@test.pl");

        when(repository.findByUsername(username)).thenReturn(Optional.of(expectedUser));

        // When
        Optional<User> result = service.getByUsername(username);

        // Then
        assertTrue(result.isPresent());
        assertEquals(username, result.get().getUsername());
        assertEquals("user@test.pl", result.get().getEmail());

        verify(repository, times(1)).findByUsername(username);
    }

    @Test
    void shouldSaveAndReturnUser() {
        // Given
        User userToSave = new User();
        userToSave.setUsername("nowy_user");

        User savedUser = new User();
        savedUser.setId(1L);
        savedUser.setUsername("nowy_user");

        when(repository.save(userToSave)).thenReturn(savedUser);

        // When
        User result = service.createUser(userToSave);

        // Then
        assertNotNull(result);
        assertEquals(1L, result.getId());
        assertEquals("nowy_user", result.getUsername());

        verify(repository, times(1)).save(userToSave);
    }

    //NEGATIVE PATH

    @Test
    void shouldReturnEmptyOptionalWhenUsernameDoesNotExist() {
        // Given
        String nonExistingUsername = "nieistniejacy_user";

        when(repository.findByUsername(nonExistingUsername)).thenReturn(Optional.empty());

        // When
        Optional<User> result = service.getByUsername(nonExistingUsername);

        // Then
        assertTrue(result.isEmpty());
        verify(repository, times(1)).findByUsername(nonExistingUsername);
    }
}