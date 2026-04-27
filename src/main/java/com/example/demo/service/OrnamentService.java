package com.example.demo.service;

import com.example.demo.model.Ornament;
import com.example.demo.repository.OrnamentRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrnamentService {
    private final OrnamentRepository repository;

    public OrnamentService(OrnamentRepository repo){
        this.repository = repo;
    }

    public List<Ornament> getAllOrnaments(){
        return repository.findAll();
    }

    public Optional<Ornament> getOrnamentById(Long id) {
        return repository.findById(id);
    }

    public Ornament createOrnament(Ornament ornament){
        return repository.save(ornament);
    }

    public void deleteOrnament(Long id) {
        repository.deleteById(id);
    }
}
