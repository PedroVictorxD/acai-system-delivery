package com.acai.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CardapioResponse {

    private List<CategoriaCardapio> categorias;
    private List<ComplementoResponse> complementos;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CategoriaCardapio {
        private UUID id;
        private String nome;
        private String descricao;
        private String imagemUrl;
        private List<ProdutoCardapio> produtos;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ProdutoCardapio {
        private UUID id;
        private String nome;
        private String descricao;
        private BigDecimal preco;
        private String imagemUrl;
        private Integer tamanhoMl;
    }
}
