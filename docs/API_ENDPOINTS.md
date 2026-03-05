# API Endpoints (planejado)

## Auth
| Método | Rota | Descrição |
|--------|------|-----------|
| POST | `/api/auth/login` | Login (retorna JWT) |
| POST | `/api/auth/register` | Criar usuário (admin only) |

## Categorias
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/api/categorias` | Listar todas |
| POST | `/api/categorias` | Criar |
| PUT | `/api/categorias/{id}` | Atualizar |
| DELETE | `/api/categorias/{id}` | Remover |

## Produtos
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/api/produtos` | Listar todos |
| GET | `/api/produtos/categoria/{id}` | Por categoria |
| POST | `/api/produtos` | Criar |
| PUT | `/api/produtos/{id}` | Atualizar |
| DELETE | `/api/produtos/{id}` | Remover |

## Complementos
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/api/complementos` | Listar todos |
| POST | `/api/complementos` | Criar |
| PUT | `/api/complementos/{id}` | Atualizar |
| DELETE | `/api/complementos/{id}` | Remover |

## Pedidos
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/api/pedidos` | Listar pedidos |
| GET | `/api/pedidos/{id}` | Detalhes |
| POST | `/api/pedidos` | Criar pedido |
| PATCH | `/api/pedidos/{id}/status` | Atualizar status |

## Cardápio Público (sem auth)
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/api/public/cardapio` | Cardápio completo |
| POST | `/api/public/pedidos` | Criar pedido (cliente) |
| GET | `/api/public/pedidos/{id}/status` | Status do pedido |

## Caixa
| Método | Rota | Descrição |
|--------|------|-----------|
| POST | `/api/caixa/abrir` | Abrir caixa |
| POST | `/api/caixa/fechar` | Fechar caixa |
| POST | `/api/caixa/movimento` | Registrar movimento |
| GET | `/api/caixa/atual` | Caixa atual |
| GET | `/api/caixa/{id}/relatorio` | Relatório |
