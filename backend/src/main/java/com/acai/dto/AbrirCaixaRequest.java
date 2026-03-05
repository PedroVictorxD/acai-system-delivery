package com.acai.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AbrirCaixaRequest {

    @NotNull(message = "Valor inicial é obrigatório")
    private BigDecimal valorInicial;
}
