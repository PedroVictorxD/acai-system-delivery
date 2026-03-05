package com.acai.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "clientes")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Cliente {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private String nome;

    @Column(nullable = false, unique = true)
    private String telefone;

    private String endereco;

    private String bairro;

    @Column(name = "complemento_endereco")
    private String complementoEndereco;

    @CreationTimestamp
    @Column(name = "criado_em", updatable = false)
    private LocalDateTime criadoEm;
}
