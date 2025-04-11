package com.projetoweb.gerenciadorescolar.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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

    @GetMapping
    public List<TurmaDTO> getAll(){
        List<TurmaDTO> listaTurmas = turmaRepository.findAll().stream().map(TurmaDTO::new).toList();
        return listaTurmas;
    }

    @PutMapping("/{id}")
    public ResponseEntity<TurmaDTO> update(@PathVariable Long id, @RequestBody Turma dados){
        return turmaRepository.findById(id).map(turma -> {
            turma.setNome(dados.getNome());
            turma.setAnoLetivo(dados.getAnoLetivo());
            turma.setProfessores(dados.getProfessores());

            Turma turmaAtualizada = turmaRepository.save(turma);
            return ResponseEntity.ok(new TurmaDTO(turmaAtualizada));
        }).orElse(ResponseEntity.notFound().build());
    }
}
