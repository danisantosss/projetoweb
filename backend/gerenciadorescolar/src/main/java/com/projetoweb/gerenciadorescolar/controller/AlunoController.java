package com.projetoweb.gerenciadorescolar.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.projetoweb.gerenciadorescolar.entity.Aluno;
import com.projetoweb.gerenciadorescolar.entity.AlunoDTO;
import com.projetoweb.gerenciadorescolar.entity.Turma;
import com.projetoweb.gerenciadorescolar.repository.AlunoRepository;
import com.projetoweb.gerenciadorescolar.repository.TurmaRepository;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/aluno")
public class AlunoController {

    @Autowired
    private AlunoRepository alunoRepository;

    @Autowired
    private TurmaRepository turmaRepository;

    @PostMapping
    public ResponseEntity<?> create(@RequestBody Aluno aluno) {
        if (aluno.getTurma() == null || aluno.getTurma().getId() == null) {
            return ResponseEntity.badRequest().body("Turma é obrigatória");
        }

        Optional<Turma> turmaOpt = turmaRepository.findById(aluno.getTurma().getId());
        if (turmaOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("Turma não encontrada");
        }

        aluno.setTurma(turmaOpt.get());
        Aluno novoAluno = alunoRepository.save(aluno);
        return ResponseEntity.status(HttpStatus.CREATED).body(new AlunoDTO(novoAluno));
    }

    @GetMapping
    public List<AlunoDTO> getAll() {
        List<AlunoDTO> listaAlunos = alunoRepository.findAll().stream().map(AlunoDTO::new).toList();
        return listaAlunos;
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody Aluno dados) {
        if (dados.getTurma() == null || dados.getTurma().getId() == null) {
            return ResponseEntity.badRequest().body("Turma é obrigatória");
        }

        Optional<Turma> turmaOpt = turmaRepository.findById(dados.getTurma().getId());
        if (turmaOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("Turma não encontrada");
        }

        return alunoRepository.findById(id).map(aluno -> {
            aluno.setNome(dados.getNome());
            aluno.setCpf(dados.getCpf());
            aluno.setEmail(dados.getEmail());
            aluno.setDataNascimento(dados.getDataNascimento());
            aluno.setTurma(turmaOpt.get());
            aluno.setNota1(dados.getNota1());
            aluno.setNota2(dados.getNota2());
            aluno.setNota3(dados.getNota3());
            Aluno atualizado = alunoRepository.save(aluno);
            return ResponseEntity.ok(new AlunoDTO(atualizado));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        if (alunoRepository.existsById(id)) {
            alunoRepository.deleteById(id);
            return ResponseEntity.ok("Aluno deletado com sucesso!");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Aluno não encontrado.");
    }

    @GetMapping("/buscar")
    public List<Aluno> buscarPorNome(@RequestParam String nome) {
        return alunoRepository.findByNomeContainingIgnoreCase(nome);
    }
}