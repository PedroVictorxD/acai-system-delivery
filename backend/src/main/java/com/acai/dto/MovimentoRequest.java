package com.acai.dto;

import com.acai.enums.CashMovementType;
import com.acai.enums.PaymentMethod;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MovimentoRequest {

    @NotNull(message = "Tipo é obrigatório")
    private CashMovementType tipo;

    @NotNull(message = "Valor é obrigatório")
    private BigDecimal valor;

    private PaymentMethod formaPagamento;

    private String descricao;
}
