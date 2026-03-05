package com.acai.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProdutoResponse {

    private UUID id;
    private UUID categoriaId;
    private String categoriaNome;
    private String nome;
    private String descricao;
    private BigDecimal preco;
    private String imagemUrl;
    private Boolean disponivel;
    private Integer tamanhoMl;
}
