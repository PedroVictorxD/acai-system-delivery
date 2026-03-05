-- V4__create_pedidos_tables.sql
-- Tabelas de pedidos e itens

CREATE TABLE pedidos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    numero_pedido INTEGER NOT NULL UNIQUE,
    cliente_id UUID REFERENCES clientes(id),
    origem VARCHAR(20) NOT NULL CHECK (origem IN ('LOJA', 'LINK', 'IFOOD')),
    status VARCHAR(20) NOT NULL DEFAULT 'PENDENTE' CHECK (status IN ('PENDENTE', 'PREPARANDO', 'PRONTO', 'ENTREGUE', 'CANCELADO')),
    tipo VARCHAR(20) NOT NULL CHECK (tipo IN ('RETIRADA', 'DELIVERY', 'MESA')),
    subtotal DECIMAL(10,2) NOT NULL DEFAULT 0,
    taxa_entrega DECIMAL(10,2) DEFAULT 0,
    desconto DECIMAL(10,2) DEFAULT 0,
    total DECIMAL(10,2) NOT NULL DEFAULT 0,
    observacoes TEXT,
    criado_em TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    atualizado_em TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_pedidos_status ON pedidos(status);
CREATE INDEX idx_pedidos_cliente ON pedidos(cliente_id);
CREATE INDEX idx_pedidos_criado_em ON pedidos(criado_em);

-- Sequência para número do pedido
CREATE SEQUENCE pedido_numero_seq START 1;

CREATE TABLE itens_pedido (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    pedido_id UUID NOT NULL REFERENCES pedidos(id) ON DELETE CASCADE,
    produto_id UUID NOT NULL REFERENCES produtos(id),
    quantidade INTEGER NOT NULL DEFAULT 1,
    preco_unitario DECIMAL(10,2) NOT NULL,
    preco_total DECIMAL(10,2) NOT NULL
);

CREATE INDEX idx_itens_pedido_pedido ON itens_pedido(pedido_id);

CREATE TABLE itens_complemento (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    item_pedido_id UUID NOT NULL REFERENCES itens_pedido(id) ON DELETE CASCADE,
    complemento_id UUID NOT NULL REFERENCES complementos(id),
    quantidade INTEGER NOT NULL DEFAULT 1,
    preco DECIMAL(10,2) NOT NULL
);

CREATE INDEX idx_itens_complemento_item ON itens_complemento(item_pedido_id);
