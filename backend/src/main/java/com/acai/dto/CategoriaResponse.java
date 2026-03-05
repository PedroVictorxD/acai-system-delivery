package com.acai.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CategoriaResponse {

    private UUID id;
    private String nome;
    private String descricao;
    private String imagemUrl;
    private Integer ordem;
    private Boolean ativa;
    private List<ProdutoResponse> produtos;
}
