# Schema do Banco de Dados

## Tabelas

| Tabela | Descrição |
|--------|-----------|
| `usuarios` | Usuários do sistema (admin, caixa) |
| `categorias` | Categorias de produtos (Açaí, Guaraná, Vitaminas) |
| `produtos` | Produtos com preço e tamanho |
| `complementos` | Toppings (granola, leite condensado, etc) |
| `clientes` | Clientes com telefone e endereço |
| `pedidos` | Pedidos com origem, status e valor |
| `itens_pedido` | Itens de cada pedido |
| `itens_complemento` | Complementos de cada item |
| `caixas` | Abertura/fechamento de caixa |
| `movimentos_caixa` | Movimentações financeiras |

## Enums

| Enum | Valores |
|------|---------|
| `Role` | ADMIN, CAIXA |
| `OrderOrigin` | LOJA, LINK, IFOOD |
| `OrderStatus` | PENDENTE, PREPARANDO, PRONTO, ENTREGUE, CANCELADO |
| `OrderType` | RETIRADA, DELIVERY, MESA |
| `PaymentMethod` | DINHEIRO, PIX, CARTAO_CREDITO, CARTAO_DEBITO, IFOOD |
| `CashRegisterStatus` | ABERTO, FECHADO |
| `CashMovementType` | ENTRADA, SAIDA, SANGRIA, SUPRIMENTO |

## Relacionamentos

```
Usuario 1──N Caixa
Caixa 1──N MovimentoCaixa
Categoria 1──N Produto
Cliente 1──N Pedido
Pedido 1──N ItemPedido
ItemPedido 1──N ItemComplemento
Produto ──── ItemPedido
Complemento ──── ItemComplemento
Pedido ──── MovimentoCaixa
```
