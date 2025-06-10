package com.projetoweb.gerenciadorescolar.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.projetoweb.gerenciadorescolar.entity.Usuario;
import com.projetoweb.gerenciadorescolar.entity.UsuarioDTO;
import com.projetoweb.gerenciadorescolar.repository.UsuarioRepository;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/usuario")
@CrossOrigin(origins = "http://localhost:5173")
public class UsuarioController {
    
    @Autowired
    private UsuarioRepository usuarioRepository;

    @PostMapping("/registrar")
    public ResponseEntity<?> cadastrarUsuario(@RequestBody UsuarioDTO usuarioDTO) {
        if (usuarioRepository.existsByUsername(usuarioDTO.getUsername())) {
            return ResponseEntity.badRequest().body("Usuário já existe");
        }

        Usuario usuario = new Usuario();
        usuario.setUsername(usuarioDTO.getUsername());
        usuario.setSenha(usuarioDTO.getSenha());

        usuarioRepository.save(usuario);
        return ResponseEntity.status(201).body("Usuario cadastrado com sucesso!");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UsuarioDTO usuarioDTO) {
        Usuario usuario = usuarioRepository.findByUsername(usuarioDTO.getUsername());
        
        if (usuario == null || !usuario.getSenha().equals(usuarioDTO.getSenha())) {
            return ResponseEntity.status(401).body("Usuário ou senha inválidos!");
        }

        return ResponseEntity.ok("Login realizado com sucesso!");
    }
}