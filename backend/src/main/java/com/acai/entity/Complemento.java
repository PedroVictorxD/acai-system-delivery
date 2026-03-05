package com.acai.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.UUID;

@Entity
@Table(name = "complementos")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Complemento {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private String nome;

    @Column(name = "preco_adicional", nullable = false, precision = 10, scale = 2)
    private BigDecimal precoAdicional;

    @Column(nullable = false)
    @Builder.Default
    private Boolean disponivel = true;

    @Column(name = "max_por_pedido")
    @Builder.Default
    private Integer maxPorPedido = 5;
}
