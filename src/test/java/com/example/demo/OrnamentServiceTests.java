package com.example.demo;

import com.example.demo.model.Ornament;
import com.example.demo.repository.OrnamentRepository;
import com.example.demo.service.OrnamentService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.NoSuchElementException;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class OrnamentServiceTests {

    @Mock
    private OrnamentRepository repository;

    @InjectMocks
    private OrnamentService service;

    //HAPPY PATH
    @Test
    void shouldReturnOrnamentWhenExists() {
        // Given
        Long ornamentId = 1L;
        Ornament expectedOrnament = new Ornament();
        expectedOrnament.setId(ornamentId);
        expectedOrnament.setName("Czerwona Bombka");
        expectedOrnament.setPrice(20.0);

        when(repository.findById(ornamentId)).thenReturn(Optional.of(expectedOrnament));

        // When
        Ornament result = service.getOrnamentById(ornamentId);

        // Then
        assertNotNull(result);
        assertEquals(ornamentId, result.getId());
        assertEquals("Czerwona Bombka", result.getName());
        verify(repository, times(1)).findById(ornamentId);
    }

    //NEGATIVE PATH
    @Test
    void shouldThrowExceptionWhenOrnamentDoesNotExist() {
        // Given
        Long nonExistingId = 99L;
        when(repository.findById(nonExistingId)).thenReturn(Optional.empty());

        // When & Then
        NoSuchElementException exception = assertThrows(NoSuchElementException.class, () -> {
            service.getOrnamentById(nonExistingId);
        });

        assertEquals("Nie znaleziono produktu o ID: 99", exception.getMessage());
        verify(repository, times(1)).findById(nonExistingId);
    }

    //BIZNESOWE
    @Test
    void shouldThrowExceptionWhenOrnamentNameAlreadyExists() {
        // Given
        Ornament duplicateOrnament = new Ornament();
        duplicateOrnament.setName("Złota Bombka");

        when(repository.existsByName("Złota Bombka")).thenReturn(true);

        // When & Then
        IllegalStateException exception = assertThrows(IllegalStateException.class, () -> {
            service.createOrnament(duplicateOrnament);
        });

        assertEquals("Produkt o nazwie 'Złota Bombka' już istnieje!", exception.getMessage());

        verify(repository, times(1)).existsByName("Złota Bombka");
        verify(repository, never()).save(any(Ornament.class));
    }
}