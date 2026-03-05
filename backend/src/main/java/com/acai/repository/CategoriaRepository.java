package com.acai.repository;

import com.acai.entity.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface CategoriaRepository extends JpaRepository<Categoria, UUID> {

    List<Categoria> findByAtivaTrue();

    List<Categoria> findAllByOrderByOrdemAsc();

    List<Categoria> findByAtivaTrueOrderByOrdemAsc();
}
