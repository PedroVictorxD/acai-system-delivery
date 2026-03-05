# 🍇 Açaí System — Plano do Projeto

## Visão Geral
Sistema de gestão para loja de açaí: PDV, pedidos online (estilo Anota Aí), iFood, impressora térmica.

## Tech Stack
- **Backend:** Java 17 + Spring Boot 3.2.5 + PostgreSQL + Flyway
- **Frontend:** React + Vite + TypeScript
- **Auth:** JWT + Spring Security
- **Real-time:** WebSocket (STOMP)

## Fases

### Fase 1 — Fundação Backend 🏗️
- [x] Projeto Spring Boot + estrutura de pastas
- [x] Enums do domínio
- [x] Entities JPA
- [ ] Migrations Flyway
- [ ] Repositories
- [ ] Autenticação JWT + Spring Security

### Fase 2 — Core de Negócio Backend 💼
- [ ] CRUD Categorias + Produtos + Complementos
- [ ] Sistema de Pedidos (criar, atualizar status)
- [ ] Controle de Caixa (abrir, fechar, movimentações)
- [ ] WebSocket para pedidos em tempo real
- [ ] Endpoint público do cardápio

### Fase 3 — Frontend Admin 🖥️
- [ ] Projeto React + Vite + TypeScript
- [ ] Design System (cores, tipografia, componentes)
- [ ] Login
- [ ] Dashboard
- [ ] PDV (criação de pedido)
- [ ] Gestão de Produtos
- [ ] Controle de Caixa
- [ ] Painel de Pedidos (kanban)

### Fase 4 — Frontend Cliente (Anota Aí) 📱
- [ ] Cardápio online mobile-first
- [ ] Montagem de pedido + complementos
- [ ] Carrinho + checkout
- [ ] Acompanhamento do pedido

### Fase 5 — Integrações 🔌
- [ ] Integração iFood
- [ ] Impressão térmica (ESC/POS)

### Fase 6 — Deploy 🚀
- [ ] Docker Compose
- [ ] CI/CD GitHub Actions
- [ ] Testes automatizados
