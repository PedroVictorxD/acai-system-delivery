package com.acai.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CategoriaRequest {

    @NotBlank(message = "Nome é obrigatório")
    private String nome;

    private String descricao;

    private String imagemUrl;

    private Integer ordem;
}
