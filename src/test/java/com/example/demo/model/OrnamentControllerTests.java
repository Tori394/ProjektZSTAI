package com.example.demo.model;

import com.example.demo.controller.OrnamentController;
import com.example.demo.dto.OrnamentRequest;
import com.example.demo.service.OrnamentService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.util.ReflectionTestUtils;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class OrnamentControllerTests {

    @Mock
    private OrnamentService service;

    @InjectMocks
    private OrnamentController controller;

    @Test
    void shouldReturnAllOrnaments() {
        Ornament ornament = new Ornament();
        ornament.setId(1L);
        ornament.setName("Bombka");
        ornament.setPrice(10.0);
        ornament.setColour(1);
        ornament.setSize(10);

        when(service.getAllOrnaments()).thenReturn(List.of(ornament));

        // When
        var result = controller.getAll();

        // Then
        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals("Bombka", result.get(0).getName());

        verify(service, times(1)).getAllOrnaments();
    }

    @Test
    void shouldReturnOrnamentById() {
        // Given
        Ornament ornament = new Ornament();
        ornament.setId(1L);
        ornament.setName("Bombka");
        ornament.setPrice(10.0);
        ornament.setColour(1);
        ornament.setSize(10);

        when(service.getOrnamentById(1L)).thenReturn(ornament);

        // When
        var result = controller.getById(1L).getBody(); ;

        // Then
        assertNotNull(result);
        assertEquals(1L, result.getId());
        assertEquals("Bombka", result.getName());

        verify(service, times(1)).getOrnamentById(1L);
    }

    @Test
    void shouldCreateOrnamentWhenRequestIsValid() {
        // Given
        OrnamentRequest request = new OrnamentRequest();
        ReflectionTestUtils.setField(request, "name", "Nowa Bombka");
        ReflectionTestUtils.setField(request, "price", 25.0);
        ReflectionTestUtils.setField(request, "size", 10);
        ReflectionTestUtils.setField(request, "colour", 5);

        Ornament savedOrnament = new Ornament();
        savedOrnament.setId(1L);
        savedOrnament.setName("Nowa Bombka");
        savedOrnament.setPrice(25.0);
        savedOrnament.setColour(5);
        savedOrnament.setSize(10);

        when(service.createOrnament(any(Ornament.class))).thenReturn(savedOrnament);

        // When
        var result = controller.create(request);

        // Then
        assertNotNull(result);
        assertEquals(1L, result.getId());
        assertEquals("Nowa Bombka", result.getName());

        verify(service, times(1)).createOrnament(any(Ornament.class));
    }

    @Test
    void shouldDeleteOrnament() {
        // When
        controller.delete(1L);

        // Then
        verify(service, times(1)).deleteOrnament(1L);
    }
}