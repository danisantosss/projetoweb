package com.projetoweb.gerenciadorescolar.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.projetoweb.gerenciadorescolar.entity.Usuario;

public interface UsuarioRepository extends JpaRepository <Usuario, Long> {
    boolean existsByUsername(String username);
    Usuario findByUsername(String username);
}