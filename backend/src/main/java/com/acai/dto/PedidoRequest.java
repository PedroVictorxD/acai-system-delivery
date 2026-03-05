package com.acai.dto;

import com.acai.enums.OrderOrigin;
import com.acai.enums.OrderType;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PedidoRequest {

    private UUID clienteId;

    @NotNull(message = "Origem é obrigatória")
    private OrderOrigin origem;

    @NotNull(message = "Tipo é obrigatório")
    private OrderType tipo;

    @NotEmpty(message = "Pedido deve ter pelo menos 1 item")
    @Valid
    private List<ItemPedidoRequest> itens;

    private BigDecimal taxaEntrega;

    private BigDecimal desconto;

    private String observacoes;

    private ClienteInfo cliente;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ItemPedidoRequest {

        @NotNull(message = "Produto é obrigatório")
        private UUID produtoId;

        @NotNull(message = "Quantidade é obrigatória")
        private Integer quantidade;

        private List<ItemComplementoRequest> complementos;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ItemComplementoRequest {

        @NotNull(message = "Complemento é obrigatório")
        private UUID complementoId;

        private Integer quantidade;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ClienteInfo {
        private String nome;
        private String telefone;
        private String endereco;
        private String bairro;
        private String complementoEndereco;
    }
}
