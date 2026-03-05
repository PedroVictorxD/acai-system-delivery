package com.acai.service;

import com.acai.dto.PedidoRequest;
import com.acai.dto.PedidoResponse;
import com.acai.entity.*;
import com.acai.enums.OrderStatus;
import com.acai.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PedidoService {

    private final PedidoRepository pedidoRepository;
    private final ProdutoRepository produtoRepository;
    private final ComplementoRepository complementoRepository;
    private final ClienteRepository clienteRepository;

    public List<PedidoResponse> listarTodos() {
        return pedidoRepository.findAllByOrderByCriadoEmDesc().stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public List<PedidoResponse> listarPorStatus(OrderStatus status) {
        return pedidoRepository.findByStatus(status).stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public List<PedidoResponse> listarAtivos() {
        List<OrderStatus> ativos = List.of(OrderStatus.PENDENTE, OrderStatus.PREPARANDO, OrderStatus.PRONTO);
        return pedidoRepository.findByStatusIn(ativos).stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public PedidoResponse buscarPorId(UUID id) {
        Pedido pedido = pedidoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pedido não encontrado"));
        return toResponse(pedido);
    }

    @Transactional
    public PedidoResponse criarPedido(PedidoRequest request) {
        Cliente cliente = resolverCliente(request);

        Integer proximoNumero = pedidoRepository.findMaxNumeroPedido() + 1;

        Pedido pedido = Pedido.builder()
                .numeroPedido(proximoNumero)
                .cliente(cliente)
                .origem(request.getOrigem())
                .tipo(request.getTipo())
                .observacoes(request.getObservacoes())
                .taxaEntrega(request.getTaxaEntrega() != null ? request.getTaxaEntrega() : BigDecimal.ZERO)
                .desconto(request.getDesconto() != null ? request.getDesconto() : BigDecimal.ZERO)
                .build();

        BigDecimal subtotal = BigDecimal.ZERO;
        List<ItemPedido> itensPedido = new ArrayList<>();

        for (PedidoRequest.ItemPedidoRequest itemReq : request.getItens()) {
            Produto produto = produtoRepository.findById(itemReq.getProdutoId())
                    .orElseThrow(() -> new RuntimeException("Produto não encontrado: " + itemReq.getProdutoId()));

            BigDecimal precoUnitario = produto.getPreco();
            BigDecimal precoComplementos = BigDecimal.ZERO;

            ItemPedido itemPedido = ItemPedido.builder()
                    .pedido(pedido)
                    .produto(produto)
                    .quantidade(itemReq.getQuantidade())
                    .precoUnitario(precoUnitario)
                    .build();

            List<ItemComplemento> complementosItem = new ArrayList<>();

            if (itemReq.getComplementos() != null) {
                for (PedidoRequest.ItemComplementoRequest compReq : itemReq.getComplementos()) {
                    Complemento complemento = complementoRepository.findById(compReq.getComplementoId())
                            .orElseThrow(() -> new RuntimeException(
                                    "Complemento não encontrado: " + compReq.getComplementoId()));

                    int qtd = compReq.getQuantidade() != null ? compReq.getQuantidade() : 1;
                    BigDecimal precoComp = complemento.getPrecoAdicional().multiply(BigDecimal.valueOf(qtd));

                    ItemComplemento itemComplemento = ItemComplemento.builder()
                            .itemPedido(itemPedido)
                            .complemento(complemento)
                            .quantidade(qtd)
                            .preco(precoComp)
                            .build();

                    complementosItem.add(itemComplemento);
                    precoComplementos = precoComplementos.add(precoComp);
                }
            }

            BigDecimal precoTotalItem = precoUnitario.add(precoComplementos)
                    .multiply(BigDecimal.valueOf(itemReq.getQuantidade()));

            itemPedido.setPrecoTotal(precoTotalItem);
            itemPedido.setComplementos(complementosItem);
            itensPedido.add(itemPedido);

            subtotal = subtotal.add(precoTotalItem);
        }

        pedido.setItens(itensPedido);
        pedido.setSubtotal(subtotal);
        pedido.setTotal(subtotal
                .add(pedido.getTaxaEntrega())
                .subtract(pedido.getDesconto()));

        return toResponse(pedidoRepository.save(pedido));
    }

    @Transactional
    public PedidoResponse atualizarStatus(UUID id, OrderStatus novoStatus) {
        Pedido pedido = pedidoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pedido não encontrado"));

        validarTransicaoStatus(pedido.getStatus(), novoStatus);
        pedido.setStatus(novoStatus);

        return toResponse(pedidoRepository.save(pedido));
    }

    private void validarTransicaoStatus(OrderStatus atual, OrderStatus novo) {
        boolean valido = switch (atual) {
            case PENDENTE -> novo == OrderStatus.PREPARANDO || novo == OrderStatus.CANCELADO;
            case PREPARANDO -> novo == OrderStatus.PRONTO || novo == OrderStatus.CANCELADO;
            case PRONTO -> novo == OrderStatus.ENTREGUE;
            case ENTREGUE, CANCELADO -> false;
        };

        if (!valido) {
            throw new RuntimeException("Transição de status inválida: " + atual + " → " + novo);
        }
    }

    private Cliente resolverCliente(PedidoRequest request) {
        if (request.getClienteId() != null) {
            return clienteRepository.findById(request.getClienteId()).orElse(null);
        }

        if (request.getCliente() != null && request.getCliente().getTelefone() != null) {
            PedidoRequest.ClienteInfo info = request.getCliente();
            return clienteRepository.findByTelefone(info.getTelefone())
                    .orElseGet(() -> clienteRepository.save(
                            Cliente.builder()
                                    .nome(info.getNome())
                                    .telefone(info.getTelefone())
                                    .endereco(info.getEndereco())
                                    .bairro(info.getBairro())
                                    .complementoEndereco(info.getComplementoEndereco())
                                    .build()));
        }

        return null;
    }

    private PedidoResponse toResponse(Pedido pedido) {
        PedidoResponse.ClienteResumo clienteResumo = null;
        if (pedido.getCliente() != null) {
            clienteResumo = PedidoResponse.ClienteResumo.builder()
                    .id(pedido.getCliente().getId())
                    .nome(pedido.getCliente().getNome())
                    .telefone(pedido.getCliente().getTelefone())
                    .endereco(pedido.getCliente().getEndereco())
                    .build();
        }

        List<PedidoResponse.ItemPedidoResponse> itens = pedido.getItens() != null
                ? pedido.getItens().stream().map(item -> {
                    List<PedidoResponse.ItemComplementoResponse> complementos = item.getComplementos() != null
                            ? item.getComplementos().stream()
                                    .map(comp -> PedidoResponse.ItemComplementoResponse.builder()
                                            .complementoNome(comp.getComplemento().getNome())
                                            .quantidade(comp.getQuantidade())
                                            .preco(comp.getPreco())
                                            .build())
                                    .collect(Collectors.toList())
                            : Collections.emptyList();

                    return PedidoResponse.ItemPedidoResponse.builder()
                            .id(item.getId())
                            .produtoNome(item.getProduto().getNome())
                            .quantidade(item.getQuantidade())
                            .precoUnitario(item.getPrecoUnitario())
                            .precoTotal(item.getPrecoTotal())
                            .tamanhoMl(item.getProduto().getTamanhoMl())
                            .complementos(complementos)
                            .build();
                }).collect(Collectors.toList())
                : Collections.emptyList();

        return PedidoResponse.builder()
                .id(pedido.getId())
                .numeroPedido(pedido.getNumeroPedido())
                .origem(pedido.getOrigem())
                .status(pedido.getStatus())
                .tipo(pedido.getTipo())
                .subtotal(pedido.getSubtotal())
                .taxaEntrega(pedido.getTaxaEntrega())
                .desconto(pedido.getDesconto())
                .total(pedido.getTotal())
                .observacoes(pedido.getObservacoes())
                .criadoEm(pedido.getCriadoEm())
                .atualizadoEm(pedido.getAtualizadoEm())
                .cliente(clienteResumo)
                .itens(itens)
                .build();
    }
}
