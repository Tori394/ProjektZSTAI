package com.example.demo.model;

import com.example.demo.repository.OrnamentRepository;
import com.example.demo.service.OrnamentService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
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

    @Test
    void shouldReturnAllOrnaments() {
        // Given
        Ornament o1 = new Ornament();
        o1.setId(1L);
        o1.setName("Bombka 1");

        Ornament o2 = new Ornament();
        o2.setId(2L);
        o2.setName("Bombka 2");

        when(repository.findAll()).thenReturn(List.of(o1, o2));

        // When
        List<Ornament> result = service.getAllOrnaments();

        // Then
        assertNotNull(result);
        assertEquals(2, result.size());
        assertEquals("Bombka 1", result.get(0).getName());
        verify(repository, times(1)).findAll();
    }

    void shouldCreateOrnamentWhenNameDoesNotExist() {
        // Given
        Ornament newOrnament = new Ornament();
        newOrnament.setName("Srebrna Bombka");

        Ornament savedOrnament = new Ornament();
        savedOrnament.setId(1L);
        savedOrnament.setName("Srebrna Bombka");

        when(repository.existsByName("Srebrna Bombka")).thenReturn(false);
        when(repository.save(newOrnament)).thenReturn(savedOrnament);

        // When
        Ornament result = service.createOrnament(newOrnament);

        // Then
        assertNotNull(result);
        assertEquals(1L, result.getId());
        assertEquals("Srebrna Bombka", result.getName());
        verify(repository, times(1)).existsByName("Srebrna Bombka");
        verify(repository, times(1)).save(newOrnament);
    }

    @Test
    void shouldDeleteOrnamentWhenExists() {
        // Given
        Long ornamentId = 1L;
        Ornament ornamentToDelete = new Ornament();
        ornamentToDelete.setId(ornamentId);

        when(repository.findById(ornamentId)).thenReturn(Optional.of(ornamentToDelete));

        // When
        service.deleteOrnament(ornamentId);

        // Then
        verify(repository, times(1)).findById(ornamentId);
        verify(repository, times(1)).delete(ornamentToDelete);
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

    @Test
    void shouldThrowExceptionWhenDeletingNonExistingOrnament() {
        // Given
        Long nonExistingId = 99L;
        when(repository.findById(nonExistingId)).thenReturn(Optional.empty());

        // When & Then
        NoSuchElementException exception = assertThrows(NoSuchElementException.class, () -> {
            service.deleteOrnament(nonExistingId);
        });

        assertEquals("Nie znaleziono produktu o ID: 99", exception.getMessage());
        verify(repository, times(1)).findById(nonExistingId);
        verify(repository, never()).delete(any(Ornament.class));
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