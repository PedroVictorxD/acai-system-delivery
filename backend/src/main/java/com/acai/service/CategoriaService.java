package com.acai.service;

import com.acai.dto.CategoriaRequest;
import com.acai.dto.CategoriaResponse;
import com.acai.dto.ProdutoResponse;
import com.acai.entity.Categoria;
import com.acai.repository.CategoriaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CategoriaService {

    private final CategoriaRepository categoriaRepository;

    public List<CategoriaResponse> listarTodas() {
        return categoriaRepository.findAllByOrderByOrdemAsc().stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public List<CategoriaResponse> listarAtivas() {
        return categoriaRepository.findByAtivaTrueOrderByOrdemAsc().stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public CategoriaResponse buscarPorId(UUID id) {
        Categoria categoria = categoriaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Categoria não encontrada"));
        return toResponse(categoria);
    }

    @Transactional
    public CategoriaResponse criar(CategoriaRequest request) {
        Categoria categoria = Categoria.builder()
                .nome(request.getNome())
                .descricao(request.getDescricao())
                .imagemUrl(request.getImagemUrl())
                .ordem(request.getOrdem() != null ? request.getOrdem() : 0)
                .build();

        return toResponse(categoriaRepository.save(categoria));
    }

    @Transactional
    public CategoriaResponse atualizar(UUID id, CategoriaRequest request) {
        Categoria categoria = categoriaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Categoria não encontrada"));

        categoria.setNome(request.getNome());
        categoria.setDescricao(request.getDescricao());
        categoria.setImagemUrl(request.getImagemUrl());
        if (request.getOrdem() != null) {
            categoria.setOrdem(request.getOrdem());
        }

        return toResponse(categoriaRepository.save(categoria));
    }

    @Transactional
    public void alternarStatus(UUID id) {
        Categoria categoria = categoriaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Categoria não encontrada"));
        categoria.setAtiva(!categoria.getAtiva());
        categoriaRepository.save(categoria);
    }

    @Transactional
    public void deletar(UUID id) {
        if (!categoriaRepository.existsById(id)) {
            throw new RuntimeException("Categoria não encontrada");
        }
        categoriaRepository.deleteById(id);
    }

    private CategoriaResponse toResponse(Categoria categoria) {
        List<ProdutoResponse> produtos = categoria.getProdutos() != null
                ? categoria.getProdutos().stream()
                        .map(p -> ProdutoResponse.builder()
                                .id(p.getId())
                                .categoriaId(categoria.getId())
                                .categoriaNome(categoria.getNome())
                                .nome(p.getNome())
                                .descricao(p.getDescricao())
                                .preco(p.getPreco())
                                .imagemUrl(p.getImagemUrl())
                                .disponivel(p.getDisponivel())
                                .tamanhoMl(p.getTamanhoMl())
                                .build())
                        .collect(Collectors.toList())
                : Collections.emptyList();

        return CategoriaResponse.builder()
                .id(categoria.getId())
                .nome(categoria.getNome())
                .descricao(categoria.getDescricao())
                .imagemUrl(categoria.getImagemUrl())
                .ordem(categoria.getOrdem())
                .ativa(categoria.getAtiva())
                .produtos(produtos)
                .build();
    }
}
