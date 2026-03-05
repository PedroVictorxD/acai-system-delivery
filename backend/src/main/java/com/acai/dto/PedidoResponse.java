package com.acai.dto;

import com.acai.enums.OrderOrigin;
import com.acai.enums.OrderStatus;
import com.acai.enums.OrderType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PedidoResponse {

    private UUID id;
    private Integer numeroPedido;
    private OrderOrigin origem;
    private OrderStatus status;
    private OrderType tipo;
    private BigDecimal subtotal;
    private BigDecimal taxaEntrega;
    private BigDecimal desconto;
    private BigDecimal total;
    private String observacoes;
    private LocalDateTime criadoEm;
    private LocalDateTime atualizadoEm;
    private ClienteResumo cliente;
    private List<ItemPedidoResponse> itens;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ClienteResumo {
        private UUID id;
        private String nome;
        private String telefone;
        private String endereco;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ItemPedidoResponse {
        private UUID id;
        private String produtoNome;
        private Integer quantidade;
        private BigDecimal precoUnitario;
        private BigDecimal precoTotal;
        private Integer tamanhoMl;
        private List<ItemComplementoResponse> complementos;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ItemComplementoResponse {
        private String complementoNome;
        private Integer quantidade;
        private BigDecimal preco;
    }
}
