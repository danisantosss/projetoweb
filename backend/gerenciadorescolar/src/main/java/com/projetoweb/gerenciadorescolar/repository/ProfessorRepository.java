package com.projetoweb.gerenciadorescolar.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.projetoweb.gerenciadorescolar.entity.Professor;

public interface ProfessorRepository extends JpaRepository<Professor, Long> {}