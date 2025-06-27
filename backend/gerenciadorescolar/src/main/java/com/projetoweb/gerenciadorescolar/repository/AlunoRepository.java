package com.projetoweb.gerenciadorescolar.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.projetoweb.gerenciadorescolar.entity.Aluno;

public interface AlunoRepository extends JpaRepository<Aluno, Long> {
    List<Aluno> findByNomeContainingIgnoreCase(String nome);
}