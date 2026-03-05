package com.acai.controller;

import com.acai.dto.ClienteRequest;
import com.acai.dto.ClienteResponse;
import com.acai.dto.PedidoResponse;
import com.acai.service.ClienteService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/clientes")
@RequiredArgsConstructor
public class ClienteController {

    private final ClienteService clienteService;

    @GetMapping
    public ResponseEntity<List<ClienteResponse>> listarTodos() {
        return ResponseEntity.ok(clienteService.listarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ClienteResponse> buscarPorId(@PathVariable UUID id) {
        return ResponseEntity.ok(clienteService.buscarPorId(id));
    }

    @GetMapping("/telefone/{telefone}")
    public ResponseEntity<ClienteResponse> buscarPorTelefone(@PathVariable String telefone) {
        return ResponseEntity.ok(clienteService.buscarPorTelefone(telefone));
    }

    @PostMapping
    public ResponseEntity<ClienteResponse> criar(@Valid @RequestBody ClienteRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(clienteService.criar(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ClienteResponse> atualizar(@PathVariable UUID id,
            @Valid @RequestBody ClienteRequest request) {
        return ResponseEntity.ok(clienteService.atualizar(id, request));
    }

    @GetMapping("/{id}/pedidos")
    public ResponseEntity<List<PedidoResponse>> historicoPedidos(@PathVariable UUID id) {
        return ResponseEntity.ok(clienteService.historicoPedidos(id));
    }
}
