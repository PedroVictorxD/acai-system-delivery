package com.acai.repository;

import com.acai.entity.Caixa;
import com.acai.enums.CashRegisterStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface CaixaRepository extends JpaRepository<Caixa, UUID> {

    Optional<Caixa> findByUsuarioIdAndStatus(UUID usuarioId, CashRegisterStatus status);

    Optional<Caixa> findFirstByStatusOrderByAberturaDesc(CashRegisterStatus status);

    boolean existsByUsuarioIdAndStatus(UUID usuarioId, CashRegisterStatus status);
}
