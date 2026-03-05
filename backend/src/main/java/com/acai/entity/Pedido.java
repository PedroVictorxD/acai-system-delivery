package com.acai.entity;

import com.acai.enums.OrderOrigin;
import com.acai.enums.OrderStatus;
import com.acai.enums.OrderType;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "pedidos")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Pedido {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "numero_pedido", nullable = false, unique = true)
    private Integer numeroPedido;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cliente_id")
    private Cliente cliente;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private OrderOrigin origem;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @Builder.Default
    private OrderStatus status = OrderStatus.PENDENTE;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private OrderType tipo;

    @Column(nullable = false, precision = 10, scale = 2)
    @Builder.Default
    private BigDecimal subtotal = BigDecimal.ZERO;

    @Column(name = "taxa_entrega", precision = 10, scale = 2)
    @Builder.Default
    private BigDecimal taxaEntrega = BigDecimal.ZERO;

    @Column(precision = 10, scale = 2)
    @Builder.Default
    private BigDecimal desconto = BigDecimal.ZERO;

    @Column(nullable = false, precision = 10, scale = 2)
    @Builder.Default
    private BigDecimal total = BigDecimal.ZERO;

    private String observacoes;

    @OneToMany(mappedBy = "pedido", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<ItemPedido> itens = new ArrayList<>();

    @CreationTimestamp
    @Column(name = "criado_em", updatable = false)
    private LocalDateTime criadoEm;

    @UpdateTimestamp
    @Column(name = "atualizado_em")
    private LocalDateTime atualizadoEm;
}
