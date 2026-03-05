-- V6__seed_initial_data.sql
-- Dados iniciais: usuário admin + categorias + complementos padrão

-- Admin padrão (senha: admin123 - BCrypt hash)
INSERT INTO usuarios (nome, email, senha_hash, role) VALUES
    ('Administrador', 'admin@acai.com', '$2b$10$AqN97gBcRZomy8GTHNjh.uPwAD7GcVQM1Bl/IFDwtNEHNijTw.IFK', 'ADMIN');

-- Categorias
INSERT INTO categorias (nome, descricao, ordem) VALUES
    ('Açaí', 'Açaí puro e cremoso, direto do Pará', 1),
    ('Guaraná do Amazonas', 'Guaraná natural e refrigerantes regionais', 2),
    ('Vitaminas', 'Vitaminas de frutas naturais', 3);

-- Complementos populares
INSERT INTO complementos (nome, preco_adicional) VALUES
    ('Granola', 2.00),
    ('Leite Condensado', 2.50),
    ('Leite em Pó', 2.00),
    ('Banana', 2.00),
    ('Morango', 3.00),
    ('Paçoca', 2.50),
    ('Amendoim', 2.00),
    ('Mel', 2.50),
    ('Nutella', 5.00),
    ('Confete', 3.00);
