package com.acai.service;

import com.acai.dto.PedidoResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class NotificacaoService {

    private final SimpMessagingTemplate messagingTemplate;

    public void notificarNovoPedido(PedidoResponse pedido) {
        messagingTemplate.convertAndSend("/topic/pedidos/novo", pedido);
    }

    public void notificarStatusAtualizado(PedidoResponse pedido) {
        messagingTemplate.convertAndSend("/topic/pedidos/status", pedido);
    }

    public void notificarPedidoCliente(String pedidoId, PedidoResponse pedido) {
        messagingTemplate.convertAndSend("/topic/pedidos/" + pedidoId, pedido);
    }
}
