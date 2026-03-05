package com.acai.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "produtos")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Produto {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "categoria_id", nullable = false)
    private Categoria categoria;

    @Column(nullable = false)
    private String nome;

    private String descricao;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal preco;

    @Column(name = "imagem_url")
    private String imagemUrl;

    @Column(nullable = false)
    @Builder.Default
    private Boolean disponivel = true;

    @Column(name = "tamanho_ml")
    private Integer tamanhoMl;

    @CreationTimestamp
    @Column(name = "criado_em", updatable = false)
    private LocalDateTime criadoEm;
}
