package com.projetoweb.gerenciadorescolar.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.projetoweb.gerenciadorescolar.entity.Turma;

public interface TurmaRepository extends JpaRepository <Turma, Long> {}