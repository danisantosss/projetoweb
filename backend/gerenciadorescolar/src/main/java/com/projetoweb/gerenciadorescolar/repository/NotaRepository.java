package com.projetoweb.gerenciadorescolar.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.projetoweb.gerenciadorescolar.entity.Nota;

public interface NotaRepository extends JpaRepository<Nota, Long> {
    List<Nota> findByAlunoId(Long alunoId);
}
