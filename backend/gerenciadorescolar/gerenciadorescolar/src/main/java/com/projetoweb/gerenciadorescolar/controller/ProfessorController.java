package com.projetoweb.gerenciadorescolar.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.projetoweb.gerenciadorescolar.entity.Professor;
import com.projetoweb.gerenciadorescolar.entity.ProfessorDTO;
import com.projetoweb.gerenciadorescolar.repository.ProfessorRepository;

@RestController
@RequestMapping("professor")
public class ProfessorController {

    @Autowired
    private ProfessorRepository professorRepository;

    @PostMapping
    public ResponseEntity<ProfessorDTO> create (@RequestBody Professor professor) {
        Professor novoProfessor = professorRepository.save(professor);
        return ResponseEntity.status(HttpStatus.CREATED).body(new ProfessorDTO(novoProfessor));
    }

    @GetMapping
    public List<ProfessorDTO> getAll() {
        List<ProfessorDTO> listaProfessores = professorRepository.findAll().stream().map(ProfessorDTO::new).toList();
        return listaProfessores;
    }
}