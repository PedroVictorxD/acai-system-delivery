package com.acai.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "categorias")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Categoria {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private String nome;

    private String descricao;

    @Column(name = "imagem_url")
    private String imagemUrl;

    @Column(nullable = false)
    @Builder.Default
    private Integer ordem = 0;

    @Column(nullable = false)
    @Builder.Default
    private Boolean ativa = true;

    @OneToMany(mappedBy = "categoria", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @Builder.Default
    private List<Produto> produtos = new ArrayList<>();
}
