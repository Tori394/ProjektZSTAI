package com.example.demo.service;

import com.example.demo.model.Ornament;
import com.example.demo.repository.OrnamentRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class OrnamentService {
    private final OrnamentRepository repository;

    public OrnamentService(OrnamentRepository repo){
        this.repository = repo;
    }

    public List<Ornament> getAllOrnaments(){
        return repository.findAll();
    }

    public Ornament getOrnamentById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Nie znaleziono produktu o ID: " + id));
    }

    public Ornament createOrnament(Ornament ornament){
        if (repository.existsByName(ornament.getName())) {
            throw new IllegalStateException("Produkt o nazwie '" + ornament.getName() + "' już istnieje!");
        }
        return repository.save(ornament);
    }

    public void deleteOrnament(Long id) {
        Ornament ornament = getOrnamentById(id); // Jeśli nie ma - NoSuchElementException
        repository.delete(ornament);
    }
}