package com.example.demo.dto;

public class OrnamentResponse {
    private Long id;
    private String name;
    private Double price;
    private Integer size;
    private Integer colour;

    public void setName(String name) {
        this.name = name;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setColour(Integer colour) {
        this.colour = colour;
    }

    public void setSize(Integer size) {
        this.size = size;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public Double getPrice() {
        return price;
    }

    public Integer getSize() {
        return size;
    }

    public Integer getColour() {
        return colour;
    }
}