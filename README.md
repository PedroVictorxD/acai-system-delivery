# 🍇 Açaí System Delivery

Sistema completo para gestão de loja de açaí com controle de caixa, pedidos online e integração iFood.

## Tech Stack

| Camada | Tecnologia |
|--------|-----------|
| **Backend** | Java 17 + Spring Boot 3.2.5 |
| **Frontend** | React + Vite + TypeScript |
| **Banco de Dados** | PostgreSQL |
| **Auth** | JWT + Spring Security |
| **Migração** | Flyway |

## Funcionalidades

- 🛒 PDV (Ponto de Venda) com controle de caixa
- 📱 Link para cliente montar pedido online
- 🔴 Integração com iFood para delivery
- 🖨️ Impressão de pedidos em impressora térmica
- 📦 Gestão de produtos (Açaí, Guaraná do Amazonas, Vitaminas)
- 📊 Relatórios de fechamento de caixa

## Estrutura

```
acai/
├── backend/    # Java Spring Boot API
└── frontend/   # React + Vite App
```

## Como Rodar

### Backend
```bash
cd backend
./mvnw spring-boot:run
```

### Pré-requisitos
- Java 17+
- PostgreSQL 16
- Node.js 18+
