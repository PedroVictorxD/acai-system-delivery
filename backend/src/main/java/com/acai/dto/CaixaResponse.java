package com.acai.dto;

import com.acai.enums.CashMovementType;
import com.acai.enums.CashRegisterStatus;
import com.acai.enums.PaymentMethod;
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
public class CaixaResponse {

    private UUID id;
    private String usuarioNome;
    private CashRegisterStatus status;
    private BigDecimal saldoInicial;
    private BigDecimal saldoFinal;
    private BigDecimal totalEntradas;
    private BigDecimal totalSaidas;
    private BigDecimal saldoAtual;
    private LocalDateTime abertura;
    private LocalDateTime fechamento;
    private List<MovimentoResponse> movimentos;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class MovimentoResponse {
        private UUID id;
        private CashMovementType tipo;
        private BigDecimal valor;
        private PaymentMethod formaPagamento;
        private String descricao;
        private LocalDateTime criadoEm;
    }
}
