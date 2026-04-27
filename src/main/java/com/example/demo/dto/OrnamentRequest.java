package com.example.demo.dto;

import jakarta.validation.constraints.*;

public class OrnamentRequest {

    @NotNull(message = "Nazwa wymagana")
    @Size(min = 3, max = 150)
    private String name;

    @NotNull(message = "Cena wymagana")
    @Min(value = 0, message = "Cena >= 0")
    private Double price;

    @NotNull(message = "Rozmiar wymagany")
    @Min(value = 0)
    @Max(value = 100)
    private Integer size;

    @NotNull(message = "Kolor wymagany")
    @Min(value = 0)
    @Max(value = 100)
    private Integer colour;

    public Integer getColour() { return colour; }

    public Integer getSize() { return size; }

    public Double getPrice() {
        return price;
    }

    public String getName() {
        return name;
    }

}