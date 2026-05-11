package com.example.demo.repository;

import com.example.demo.model.Ornament;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrnamentRepository extends JpaRepository<Ornament, Long> {
    //SELECT COUNT(*) > 0 FROM ornament WHERE name = ?
    boolean existsByName(String name);
}
