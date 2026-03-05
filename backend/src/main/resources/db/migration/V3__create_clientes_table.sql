-- V3__create_clientes_table.sql
-- Tabela de clientes

CREATE TABLE clientes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome VARCHAR(255) NOT NULL,
    telefone VARCHAR(20) NOT NULL UNIQUE,
    endereco VARCHAR(500),
    bairro VARCHAR(255),
    complemento_endereco VARCHAR(255),
    criado_em TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_clientes_telefone ON clientes(telefone);
