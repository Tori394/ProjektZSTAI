package com.example.demo;

import com.example.demo.exception.GlobalExceptionHandler;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;

import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class GlobalExceptionHandlerTests {

    @InjectMocks
    private GlobalExceptionHandler exceptionHandler;

    @Test
    void shouldReturnBadRequestWithErrorsWhenValidationFails() {
        // Given
        MethodArgumentNotValidException ex = mock(MethodArgumentNotValidException.class);
        BindingResult bindingResult = mock(BindingResult.class);

        FieldError fieldError1 = new FieldError("ornamentDto", "name", "Nazwa nie może być pusta");
        FieldError fieldError2 = new FieldError("ornamentDto", "price", "Cena musi być większa niż 0");

        when(ex.getBindingResult()).thenReturn(bindingResult);
        when(bindingResult.getFieldErrors()).thenReturn(List.of(fieldError1, fieldError2));

        // When
        ResponseEntity<?> responseEntity = exceptionHandler.handleValidation(ex);

        // Then
        assertNotNull(responseEntity);
        assertEquals(HttpStatus.BAD_REQUEST, responseEntity.getStatusCode());

        @SuppressWarnings("unchecked")
        Map<String, Object> body = (Map<String, Object>) responseEntity.getBody();
        assertNotNull(body);
        assertEquals("Błąd walidacji", body.get("message"));

        @SuppressWarnings("unchecked")
        Map<String, String> errors = (Map<String, String>) body.get("errors");
        assertNotNull(errors);
        assertEquals(2, errors.size());
        assertEquals("Nazwa nie może być pusta", errors.get("name"));
        assertEquals("Cena musi być większa niż 0", errors.get("price"));

        verify(ex, times(1)).getBindingResult();
        verify(bindingResult, times(1)).getFieldErrors();
    }

    @Test
    void shouldReturnNotFoundWhenNoSuchElementExceptionIsThrown() {
        // Given
        String errorMessage = "Nie znaleziono produktu o ID: 99";
        NoSuchElementException ex = new NoSuchElementException(errorMessage);

        // When
        ResponseEntity<?> responseEntity = exceptionHandler.handleNotFound(ex);

        // Then
        assertNotNull(responseEntity);
        assertEquals(HttpStatus.NOT_FOUND, responseEntity.getStatusCode());

        @SuppressWarnings("unchecked")
        Map<String, String> body = (Map<String, String>) responseEntity.getBody();
        assertNotNull(body);
        assertEquals(errorMessage, body.get("message"));
    }

    @Test
    void shouldReturnForbiddenWhenAccessDeniedExceptionIsThrown() {
        // Given
        AccessDeniedException ex = new AccessDeniedException("Spring Security Internal Message");

        // When
        ResponseEntity<?> responseEntity = exceptionHandler.handleAccessDenied(ex);

        // Then
        assertNotNull(responseEntity);
        assertEquals(HttpStatus.FORBIDDEN, responseEntity.getStatusCode());

        @SuppressWarnings("unchecked")
        Map<String, String> body = (Map<String, String>) responseEntity.getBody();
        assertNotNull(body);
        assertEquals("Nie masz wystarczających uprawnień, aby wykonać tę akcję!", body.get("message"));
    }
}