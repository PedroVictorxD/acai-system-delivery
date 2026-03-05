package com.acai.controller;

import com.acai.dto.AbrirCaixaRequest;
import com.acai.dto.CaixaResponse;
import com.acai.dto.MovimentoRequest;
import com.acai.entity.Usuario;
import com.acai.repository.UsuarioRepository;
import com.acai.service.CaixaService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/caixa")
@RequiredArgsConstructor
public class CaixaController {

    private final CaixaService caixaService;
    private final UsuarioRepository usuarioRepository;

    @GetMapping("/aberto")
    public ResponseEntity<CaixaResponse> getCaixaAberto() {
        return ResponseEntity.ok(caixaService.getCaixaAberto());
    }

    @PostMapping("/abrir")
    public ResponseEntity<CaixaResponse> abrirCaixa(
            Authentication authentication,
            @Valid @RequestBody AbrirCaixaRequest request) {
        Usuario usuario = usuarioRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(caixaService.abrirCaixa(usuario.getId(), request));
    }

    @PatchMapping("/{id}/fechar")
    public ResponseEntity<CaixaResponse> fecharCaixa(@PathVariable UUID id) {
        return ResponseEntity.ok(caixaService.fecharCaixa(id));
    }

    @PostMapping("/{id}/movimentos")
    public ResponseEntity<CaixaResponse> registrarMovimento(
            @PathVariable UUID id,
            @Valid @RequestBody MovimentoRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(caixaService.registrarMovimento(id, request));
    }

    @GetMapping("/{id}")
    public ResponseEntity<CaixaResponse> buscarPorId(@PathVariable UUID id) {
        return ResponseEntity.ok(caixaService.buscarPorId(id));
    }
}
