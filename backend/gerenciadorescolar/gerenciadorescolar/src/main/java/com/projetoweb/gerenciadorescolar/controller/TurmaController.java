package com.projetoweb.gerenciadorescolar.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.projetoweb.gerenciadorescolar.entity.Turma;
import com.projetoweb.gerenciadorescolar.entity.TurmaDTO;
import com.projetoweb.gerenciadorescolar.repository.TurmaRepository;

@RestController
@RequestMapping("turma")
public class TurmaController {

    @Autowired
    TurmaRepository turmaRepository;

    @PostMapping
    public ResponseEntity<TurmaDTO> create (@RequestBody Turma turma){
        Turma novaTurma = turmaRepository.save(turma);
        return ResponseEntity.status(HttpStatus.CREATED).body(new TurmaDTO(novaTurma));
    }
}
