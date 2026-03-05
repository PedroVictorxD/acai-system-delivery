package com.acai.entity;

import com.acai.enums.CashRegisterStatus;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "caixas")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Caixa {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    @Column(name = "saldo_inicial", nullable = false, precision = 10, scale = 2)
    private BigDecimal saldoInicial;

    @Column(name = "saldo_final", precision = 10, scale = 2)
    private BigDecimal saldoFinal;

    @Column(nullable = false)
    private LocalDateTime abertura;

    private LocalDateTime fechamento;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @Builder.Default
    private CashRegisterStatus status = CashRegisterStatus.ABERTO;

    @OneToMany(mappedBy = "caixa", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @Builder.Default
    private List<MovimentoCaixa> movimentos = new ArrayList<>();
}
