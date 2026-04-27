package com.example.demo.service;

import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    private final UserRepository repository;

    public UserService(UserRepository repository) {
        this.repository = repository;
    }

    Optional<User> getByUsername(String username) {
        return repository.findBy(username);
    }

    public User createUser(User user){
        return repository.save(user);
    }

}