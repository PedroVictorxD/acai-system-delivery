package com.acai.service;

import com.acai.dto.ProdutoRequest;
import com.acai.dto.ProdutoResponse;
import com.acai.entity.Categoria;
import com.acai.entity.Produto;
import com.acai.repository.CategoriaRepository;
import com.acai.repository.ProdutoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProdutoService {

    private final ProdutoRepository produtoRepository;
    private final CategoriaRepository categoriaRepository;

    public List<ProdutoResponse> listarTodos() {
        return produtoRepository.findAll().stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public List<ProdutoResponse> listarDisponiveis() {
        return produtoRepository.findByDisponivelTrue().stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public List<ProdutoResponse> listarPorCategoria(UUID categoriaId) {
        return produtoRepository.findByCategoriaId(categoriaId).stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public ProdutoResponse buscarPorId(UUID id) {
        Produto produto = produtoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Produto não encontrado"));
        return toResponse(produto);
    }

    @Transactional
    public ProdutoResponse criar(ProdutoRequest request) {
        Categoria categoria = categoriaRepository.findById(request.getCategoriaId())
                .orElseThrow(() -> new RuntimeException("Categoria não encontrada"));

        Produto produto = Produto.builder()
                .categoria(categoria)
                .nome(request.getNome())
                .descricao(request.getDescricao())
                .preco(request.getPreco())
                .imagemUrl(request.getImagemUrl())
                .tamanhoMl(request.getTamanhoMl())
                .build();

        return toResponse(produtoRepository.save(produto));
    }

    @Transactional
    public ProdutoResponse atualizar(UUID id, ProdutoRequest request) {
        Produto produto = produtoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Produto não encontrado"));

        Categoria categoria = categoriaRepository.findById(request.getCategoriaId())
                .orElseThrow(() -> new RuntimeException("Categoria não encontrada"));

        produto.setCategoria(categoria);
        produto.setNome(request.getNome());
        produto.setDescricao(request.getDescricao());
        produto.setPreco(request.getPreco());
        produto.setImagemUrl(request.getImagemUrl());
        produto.setTamanhoMl(request.getTamanhoMl());

        return toResponse(produtoRepository.save(produto));
    }

    @Transactional
    public void alternarDisponibilidade(UUID id) {
        Produto produto = produtoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Produto não encontrado"));
        produto.setDisponivel(!produto.getDisponivel());
        produtoRepository.save(produto);
    }

    @Transactional
    public void deletar(UUID id) {
        if (!produtoRepository.existsById(id)) {
            throw new RuntimeException("Produto não encontrado");
        }
        produtoRepository.deleteById(id);
    }

    private ProdutoResponse toResponse(Produto produto) {
        return ProdutoResponse.builder()
                .id(produto.getId())
                .categoriaId(produto.getCategoria().getId())
                .categoriaNome(produto.getCategoria().getNome())
                .nome(produto.getNome())
                .descricao(produto.getDescricao())
                .preco(produto.getPreco())
                .imagemUrl(produto.getImagemUrl())
                .disponivel(produto.getDisponivel())
                .tamanhoMl(produto.getTamanhoMl())
                .build();
    }
}
