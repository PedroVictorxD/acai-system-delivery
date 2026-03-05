package com.acai.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.UUID;

@Entity
@Table(name = "itens_complemento")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ItemComplemento {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "item_pedido_id", nullable = false)
    private ItemPedido itemPedido;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "complemento_id", nullable = false)
    private Complemento complemento;

    @Column(nullable = false)
    @Builder.Default
    private Integer quantidade = 1;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal preco;
}
