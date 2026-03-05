package com.acai.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ClienteResponse {

    private UUID id;
    private String nome;
    private String telefone;
    private String endereco;
    private String bairro;
    private String complementoEndereco;
    private Integer totalPedidos;
}
