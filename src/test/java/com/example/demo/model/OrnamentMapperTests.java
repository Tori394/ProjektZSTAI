package com.example.demo.model;

import com.example.demo.dto.OrnamentRequest;
import com.example.demo.dto.OrnamentResponse;
import com.example.demo.mapper.OrnamentMapper;
import org.junit.jupiter.api.Test;
import org.springframework.test.util.ReflectionTestUtils;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

class OrnamentMapperTests {

    @Test
    void shouldMapRequestToEntity() {
        // Given
        OrnamentRequest request = new OrnamentRequest();
        ReflectionTestUtils.setField(request, "name", "Bombka 1");
        ReflectionTestUtils.setField(request, "price", 15.50);
        ReflectionTestUtils.setField(request, "size", 10);
        ReflectionTestUtils.setField(request, "colour", 5);

        // When
        Ornament entity = OrnamentMapper.toEntity(request);

        // Then
        assertNotNull(entity);
        assertEquals("Bombka 1", entity.getName());
        assertEquals(15.50, entity.getPrice());
        assertEquals(10, entity.getSize());
        assertEquals(5, entity.getColour());
    }

    @Test
    void shouldMapEntityToResponse() {
        // Given
        Ornament entity = new Ornament();
        entity.setId(1L);
        entity.setName("Bombka 1");
        entity.setPrice(45.00);
        entity.setSize(20);
        entity.setColour(1);

        // When
        OrnamentResponse response = OrnamentMapper.toResponse(entity);

        // Then
        assertNotNull(response);
        assertEquals(1L, response.getId());
        assertEquals("Bombka 1", response.getName());
        assertEquals(45.00, response.getPrice());
        assertEquals(20, response.getSize());
        assertEquals(1, response.getColour());
    }
}