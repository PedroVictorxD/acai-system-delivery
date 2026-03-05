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
public class ComplementoResponse {

    private UUID id;
    private String nome;
    private BigDecimal precoAdicional;
    private Boolean disponivel;
    private Integer maxPorPedido;
}
