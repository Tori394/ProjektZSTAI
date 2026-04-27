package com.example.demo.dto;

import jakarta.validation.constraints.*;

public class LoginRequest {

    @NotNull(message = "Login wymagany")
    @Size(min = 3, max = 150)
    private String username;

    @NotNull(message = "Hasło wymagane")
    @Size(min = 6, max = 150)
    private String password;


    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

}
