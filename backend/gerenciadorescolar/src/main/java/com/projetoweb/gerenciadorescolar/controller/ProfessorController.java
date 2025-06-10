package com.projetoweb.gerenciadorescolar.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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

    @PutMapping("/{id}")
    public ResponseEntity<ProfessorDTO> update(@PathVariable Long id, @RequestBody Professor dados) {
        return professorRepository.findById(id).map(professor -> {
            professor.setNome(dados.getNome());
            professor.setCpf(dados.getCpf());
            professor.setEmail(dados.getEmail());
            professor.setDisciplina(dados.getDisciplina());
            professor.setTurmas(dados.getTurmas());

            Professor professorAtualizado = professorRepository.save(professor);
            return ResponseEntity.ok(new ProfessorDTO(professorAtualizado));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        if (professorRepository.existsById(id)){
            professorRepository.deleteById(id);
            return ResponseEntity.ok("Professor deletado com sucesso!");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Professor não encontrado.");
    }
}