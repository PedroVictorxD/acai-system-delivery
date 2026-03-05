-- V5__create_caixa_tables.sql
-- Tabelas de controle de caixa

CREATE TABLE caixas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    usuario_id UUID NOT NULL REFERENCES usuarios(id),
    saldo_inicial DECIMAL(10,2) NOT NULL,
    saldo_final DECIMAL(10,2),
    abertura TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    fechamento TIMESTAMP,
    status VARCHAR(20) NOT NULL DEFAULT 'ABERTO' CHECK (status IN ('ABERTO', 'FECHADO'))
);

CREATE INDEX idx_caixas_usuario ON caixas(usuario_id);
CREATE INDEX idx_caixas_status ON caixas(status);

CREATE TABLE movimentos_caixa (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    caixa_id UUID NOT NULL REFERENCES caixas(id),
    pedido_id UUID REFERENCES pedidos(id),
    tipo VARCHAR(20) NOT NULL CHECK (tipo IN ('ENTRADA', 'SAIDA', 'SANGRIA', 'SUPRIMENTO')),
    forma_pagamento VARCHAR(30) NOT NULL CHECK (forma_pagamento IN ('DINHEIRO', 'PIX', 'CARTAO_CREDITO', 'CARTAO_DEBITO', 'IFOOD')),
    valor DECIMAL(10,2) NOT NULL,
    descricao VARCHAR(500),
    criado_em TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_movimentos_caixa ON movimentos_caixa(caixa_id);
