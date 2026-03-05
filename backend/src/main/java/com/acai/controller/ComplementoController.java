package com.acai.controller;

import com.acai.dto.ComplementoRequest;
import com.acai.dto.ComplementoResponse;
import com.acai.service.ComplementoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/complementos")
@RequiredArgsConstructor
public class ComplementoController {

    private final ComplementoService complementoService;

    @GetMapping
    public ResponseEntity<List<ComplementoResponse>> listarTodos() {
        return ResponseEntity.ok(complementoService.listarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ComplementoResponse> buscarPorId(@PathVariable UUID id) {
        return ResponseEntity.ok(complementoService.buscarPorId(id));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ComplementoResponse> criar(@Valid @RequestBody ComplementoRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(complementoService.criar(request));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ComplementoResponse> atualizar(@PathVariable UUID id,
            @Valid @RequestBody ComplementoRequest request) {
        return ResponseEntity.ok(complementoService.atualizar(id, request));
    }

    @PatchMapping("/{id}/toggle")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> alternarDisponibilidade(@PathVariable UUID id) {
        complementoService.alternarDisponibilidade(id);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deletar(@PathVariable UUID id) {
        complementoService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
