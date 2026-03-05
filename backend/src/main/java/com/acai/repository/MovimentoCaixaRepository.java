package com.acai.repository;

import com.acai.entity.MovimentoCaixa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@Repository
public interface MovimentoCaixaRepository extends JpaRepository<MovimentoCaixa, UUID> {

    List<MovimentoCaixa> findByCaixaId(UUID caixaId);

    @Query("SELECT COALESCE(SUM(m.valor), 0) FROM MovimentoCaixa m WHERE m.caixa.id = :caixaId AND m.tipo = 'ENTRADA'")
    BigDecimal sumEntradasByCaixaId(UUID caixaId);

    @Query("SELECT COALESCE(SUM(m.valor), 0) FROM MovimentoCaixa m WHERE m.caixa.id = :caixaId AND m.tipo IN ('SAIDA', 'SANGRIA')")
    BigDecimal sumSaidasByCaixaId(UUID caixaId);
}
