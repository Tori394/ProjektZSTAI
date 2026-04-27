package com.example.demo.service;

import com.example.demo.dto.LoginRequest;
import com.example.demo.dto.RegisterRequest;
import com.example.demo.model.Role;
import com.example.demo.model.User;
import com.example.demo.security.JwtUtil;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    public AuthService(UserService userService,
                       PasswordEncoder passwordEncoder,
                       AuthenticationManager authenticationManager,
                       JwtUtil jwtUtil) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
    }

    public void register(RegisterRequest req) {
        if (userService.getByUsername(req.getUsername()).isPresent()) {
            throw new RuntimeException("Użytkownik o takim loginie już istnieje!");
        }

        User user = new User();
        user.setUsername(req.getUsername());
        user.setPassword(passwordEncoder.encode(req.getPassword())); // hashujemy!
        user.setEmail(req.getEmail());
        user.setRole(req.getRole() == null ? Role.USER : req.getRole());

        userService.createUser(user);
    }

    public String login(LoginRequest req) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(req.getUsername(), req.getPassword())
        );
        User user = userService.getByUsername(req.getUsername()).orElseThrow();

        return jwtUtil.generateToken(user.getUsername(), user.getRole().name());
    }
}