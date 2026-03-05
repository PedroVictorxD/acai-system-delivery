package com.acai.service;

import com.acai.dto.ComplementoRequest;
import com.acai.dto.ComplementoResponse;
import com.acai.entity.Complemento;
import com.acai.repository.ComplementoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ComplementoService {

    private final ComplementoRepository complementoRepository;

    public List<ComplementoResponse> listarTodos() {
        return complementoRepository.findAll().stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public List<ComplementoResponse> listarDisponiveis() {
        return complementoRepository.findByDisponivelTrue().stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public ComplementoResponse buscarPorId(UUID id) {
        Complemento complemento = complementoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Complemento não encontrado"));
        return toResponse(complemento);
    }

    @Transactional
    public ComplementoResponse criar(ComplementoRequest request) {
        Complemento complemento = Complemento.builder()
                .nome(request.getNome())
                .precoAdicional(request.getPrecoAdicional())
                .maxPorPedido(request.getMaxPorPedido() != null ? request.getMaxPorPedido() : 5)
                .build();

        return toResponse(complementoRepository.save(complemento));
    }

    @Transactional
    public ComplementoResponse atualizar(UUID id, ComplementoRequest request) {
        Complemento complemento = complementoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Complemento não encontrado"));

        complemento.setNome(request.getNome());
        complemento.setPrecoAdicional(request.getPrecoAdicional());
        if (request.getMaxPorPedido() != null) {
            complemento.setMaxPorPedido(request.getMaxPorPedido());
        }

        return toResponse(complementoRepository.save(complemento));
    }

    @Transactional
    public void alternarDisponibilidade(UUID id) {
        Complemento complemento = complementoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Complemento não encontrado"));
        complemento.setDisponivel(!complemento.getDisponivel());
        complementoRepository.save(complemento);
    }

    @Transactional
    public void deletar(UUID id) {
        if (!complementoRepository.existsById(id)) {
            throw new RuntimeException("Complemento não encontrado");
        }
        complementoRepository.deleteById(id);
    }

    private ComplementoResponse toResponse(Complemento complemento) {
        return ComplementoResponse.builder()
                .id(complemento.getId())
                .nome(complemento.getNome())
                .precoAdicional(complemento.getPrecoAdicional())
                .disponivel(complemento.getDisponivel())
                .maxPorPedido(complemento.getMaxPorPedido())
                .build();
    }
}
