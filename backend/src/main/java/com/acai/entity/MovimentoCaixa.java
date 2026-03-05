package com.acai.entity;

import com.acai.enums.CashMovementType;
import com.acai.enums.PaymentMethod;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "movimentos_caixa")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MovimentoCaixa {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "caixa_id", nullable = false)
    private Caixa caixa;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "pedido_id")
    private Pedido pedido;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private CashMovementType tipo;

    @Enumerated(EnumType.STRING)
    @Column(name = "forma_pagamento", nullable = false)
    private PaymentMethod formaPagamento;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal valor;

    private String descricao;

    @CreationTimestamp
    @Column(name = "criado_em", updatable = false)
    private LocalDateTime criadoEm;
}
