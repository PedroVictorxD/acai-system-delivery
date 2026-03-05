package com.acai.repository;

import com.acai.entity.Pedido;
import com.acai.enums.OrderStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Repository
public interface PedidoRepository extends JpaRepository<Pedido, UUID> {

    List<Pedido> findByStatus(OrderStatus status);

    List<Pedido> findByStatusIn(List<OrderStatus> statuses);

    List<Pedido> findByCriadoEmBetween(LocalDateTime inicio, LocalDateTime fim);

    List<Pedido> findByClienteId(UUID clienteId);

    @Query("SELECT COALESCE(MAX(p.numeroPedido), 0) FROM Pedido p")
    Integer findMaxNumeroPedido();

    List<Pedido> findAllByOrderByCriadoEmDesc();
}
