package com.acai.repository;

import com.acai.entity.Complemento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ComplementoRepository extends JpaRepository<Complemento, UUID> {

    List<Complemento> findByDisponivelTrue();
}
