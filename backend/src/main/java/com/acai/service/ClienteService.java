package com.acai.service;

import com.acai.dto.ClienteRequest;
import com.acai.dto.ClienteResponse;
import com.acai.dto.PedidoResponse;
import com.acai.entity.Cliente;
import com.acai.repository.ClienteRepository;
import com.acai.repository.PedidoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ClienteService {

    private final ClienteRepository clienteRepository;
    private final PedidoRepository pedidoRepository;
    private final PedidoService pedidoService;

    public List<ClienteResponse> listarTodos() {
        return clienteRepository.findAll().stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public ClienteResponse buscarPorId(UUID id) {
        Cliente cliente = clienteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cliente não encontrado"));
        return toResponse(cliente);
    }

    public ClienteResponse buscarPorTelefone(String telefone) {
        Cliente cliente = clienteRepository.findByTelefone(telefone)
                .orElseThrow(() -> new RuntimeException("Cliente não encontrado"));
        return toResponse(cliente);
    }

    @Transactional
    public ClienteResponse criar(ClienteRequest request) {
        if (clienteRepository.existsByTelefone(request.getTelefone())) {
            throw new RuntimeException("Telefone já cadastrado");
        }

        Cliente cliente = Cliente.builder()
                .nome(request.getNome())
                .telefone(request.getTelefone())
                .endereco(request.getEndereco())
                .bairro(request.getBairro())
                .complementoEndereco(request.getComplementoEndereco())
                .build();

        return toResponse(clienteRepository.save(cliente));
    }

    @Transactional
    public ClienteResponse atualizar(UUID id, ClienteRequest request) {
        Cliente cliente = clienteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cliente não encontrado"));

        cliente.setNome(request.getNome());
        cliente.setTelefone(request.getTelefone());
        cliente.setEndereco(request.getEndereco());
        cliente.setBairro(request.getBairro());
        cliente.setComplementoEndereco(request.getComplementoEndereco());

        return toResponse(clienteRepository.save(cliente));
    }

    public List<PedidoResponse> historicoPedidos(UUID clienteId) {
        return pedidoRepository.findByClienteId(clienteId).stream()
                .map(pedido -> pedidoService.buscarPorId(pedido.getId()))
                .collect(Collectors.toList());
    }

    private ClienteResponse toResponse(Cliente cliente) {
        int totalPedidos = pedidoRepository.findByClienteId(cliente.getId()).size();

        return ClienteResponse.builder()
                .id(cliente.getId())
                .nome(cliente.getNome())
                .telefone(cliente.getTelefone())
                .endereco(cliente.getEndereco())
                .bairro(cliente.getBairro())
                .complementoEndereco(cliente.getComplementoEndereco())
                .totalPedidos(totalPedidos)
                .build();
    }
}
