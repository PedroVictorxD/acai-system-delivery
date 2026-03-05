package com.acai.repository;

import com.acai.entity.Produto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ProdutoRepository extends JpaRepository<Produto, UUID> {

    List<Produto> findByCategoriaId(UUID categoriaId);

    List<Produto> findByDisponivelTrue();

    List<Produto> findByCategoriaIdAndDisponivelTrue(UUID categoriaId);
}
