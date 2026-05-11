package com.example.demo.controller;

import com.example.demo.dto.OrnamentRequest;
import com.example.demo.dto.OrnamentResponse;
import com.example.demo.mapper.OrnamentMapper;
import com.example.demo.model.Ornament;
import com.example.demo.service.OrnamentService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ornaments")
public class OrnamentController {
    private final OrnamentService service;

    public OrnamentController(OrnamentService serv) {
        this.service = serv;
    }

    @GetMapping
    public List<OrnamentResponse> getAll() {
        return service.getAllOrnaments().stream()
                .map(OrnamentMapper::toResponse)
                .toList();
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrnamentResponse> getById(@PathVariable Long id) {
        Ornament ornament = service.getOrnamentById(id);
        return ResponseEntity.ok(OrnamentMapper.toResponse(ornament));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public OrnamentResponse create(@Valid @RequestBody OrnamentRequest ornament){
        return OrnamentMapper.toResponse(
                service.createOrnament(OrnamentMapper.toEntity(ornament))
        );
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.deleteOrnament(id);
        return ResponseEntity.noContent().build();
    }
}