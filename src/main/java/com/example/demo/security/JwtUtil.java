package com.example.demo.security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtUtil {
    private String secret = "///";
    public String generateToken(String username, String role) {
        return Jwts.builder()
                .setSubject(username)
                .claim("role", role)
                .setExpiration(new Date(System.currentTimeMillis() +
                        86400000)) // 24h
                .signWith(SignatureAlgorithm.HS256, secret)
                .compact();
    }
    public String extractUsername(String token) {
        return Jwts.parser().setSigningKey(secret)
                .parseClaimsJws(token).getBody().getSubject();
    }
    public String extractRole(String token) {
        return Jwts.parser().setSigningKey(secret)
                .parseClaimsJws(token).getBody().get("role",
                        String.class);
    }
    public boolean validateToken(String token) {
        try {
            Jwts.parser().setSigningKey(secret).parseClaimsJws(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
