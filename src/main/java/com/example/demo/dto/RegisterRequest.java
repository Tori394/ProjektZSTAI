package com.example.demo.dto;

import com.example.demo.model.Role;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.*;

public class RegisterRequest {

    @NotNull(message = "Login wymagany")
    @Size(min = 3, max = 150)
    private String username;

    @NotNull(message = "Hasło wymagane")
    @Size(min = 6, max = 150)
    private String password;

    @NotNull(message = "Imię wymagane")
    @Size(min = 2, max = 150)
    private String firstName;

    @NotNull(message = "Nazwisko wymagane")
    @Size(min = 2, max = 150)
    private String lastName;

    @NotNull(message = "Mail wymagany")
    @Size(min = 3, max = 150)
    private String email;

    @Enumerated(EnumType.STRING)
    private Role role; // USER, ADMIN

    public String getUsername() { return username; }

    public String getPassword() { return password; }

    public void setUsername(String username) { this.username = username; }

    public void setPassword(String password) { this.password = password; }

    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }

    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public Role getRole() { return role; }
    public void setRole(Role role) { this.role = role; }

}
