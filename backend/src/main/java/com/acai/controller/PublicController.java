package com.acai.controller;

import com.acai.dto.CardapioResponse;
import com.acai.dto.ComplementoResponse;
import com.acai.dto.PedidoRequest;
import com.acai.dto.PedidoResponse;
import com.acai.enums.OrderOrigin;
import com.acai.service.CategoriaService;
import com.acai.service.ComplementoService;
import com.acai.service.PedidoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/public")
@RequiredArgsConstructor
public class PublicController {

    private final CategoriaService categoriaService;
    private final ComplementoService complementoService;
    private final PedidoService pedidoService;

    @GetMapping("/cardapio")
    public ResponseEntity<CardapioResponse> getCardapio() {
        List<CardapioResponse.CategoriaCardapio> categorias = categoriaService.listarAtivas().stream()
                .map(cat -> CardapioResponse.CategoriaCardapio.builder()
                        .id(cat.getId())
                        .nome(cat.getNome())
                        .descricao(cat.getDescricao())
                        .imagemUrl(cat.getImagemUrl())
                        .produtos(cat.getProdutos() != null
                                ? cat.getProdutos().stream()
                                        .filter(p -> p.getDisponivel())
                                        .map(p -> CardapioResponse.ProdutoCardapio.builder()
                                                .id(p.getId())
                                                .nome(p.getNome())
                                                .descricao(p.getDescricao())
                                                .preco(p.getPreco())
                                                .imagemUrl(p.getImagemUrl())
                                                .tamanhoMl(p.getTamanhoMl())
                                                .build())
                                        .collect(Collectors.toList())
                                : List.of())
                        .build())
                .collect(Collectors.toList());

        List<ComplementoResponse> complementos = complementoService.listarDisponiveis();

        CardapioResponse cardapio = CardapioResponse.builder()
                .categorias(categorias)
                .complementos(complementos)
                .build();

        return ResponseEntity.ok(cardapio);
    }

    @PostMapping("/pedidos")
    public ResponseEntity<PedidoResponse> criarPedidoPublico(@Valid @RequestBody PedidoRequest request) {
        request.setOrigem(OrderOrigin.LINK);
        return ResponseEntity.status(HttpStatus.CREATED).body(pedidoService.criarPedido(request));
    }

    @GetMapping("/pedidos/{id}/status")
    public ResponseEntity<PedidoResponse> acompanharPedido(@PathVariable UUID id) {
        return ResponseEntity.ok(pedidoService.buscarPorId(id));
    }
}
