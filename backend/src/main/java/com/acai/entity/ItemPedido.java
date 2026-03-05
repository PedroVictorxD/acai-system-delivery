package com.acai.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "itens_pedido")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ItemPedido {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "pedido_id", nullable = false)
    private Pedido pedido;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "produto_id", nullable = false)
    private Produto produto;

    @Column(nullable = false)
    @Builder.Default
    private Integer quantidade = 1;

    @Column(name = "preco_unitario", nullable = false, precision = 10, scale = 2)
    private BigDecimal precoUnitario;

    @Column(name = "preco_total", nullable = false, precision = 10, scale = 2)
    private BigDecimal precoTotal;

    @OneToMany(mappedBy = "itemPedido", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<ItemComplemento> complementos = new ArrayList<>();
}
