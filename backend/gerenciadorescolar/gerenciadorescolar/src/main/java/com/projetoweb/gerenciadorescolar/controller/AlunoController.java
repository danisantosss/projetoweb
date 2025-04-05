package com.projetoweb.gerenciadorescolar.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.projetoweb.gerenciadorescolar.entity.Aluno;
import com.projetoweb.gerenciadorescolar.entity.AlunoDTO;
import com.projetoweb.gerenciadorescolar.repository.AlunoRepository;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("aluno")
public class AlunoController {

    @Autowired
    private AlunoRepository repository;

    @PostMapping
    public ResponseEntity<AlunoDTO> create(@RequestBody Aluno aluno) {
        Aluno novoAluno = repository.save(aluno);
        return ResponseEntity.status(HttpStatus.CREATED).body(new AlunoDTO(novoAluno));
    }

    @GetMapping
    public List<AlunoDTO> getAll(){
        List<AlunoDTO> listaAlunos = repository.findAll().stream().map(AlunoDTO::new).toList();
        return listaAlunos;
    }

    @PutMapping("/{id}")
    public ResponseEntity<AlunoDTO> update(@PathVariable Long id, @RequestBody Aluno dados) {
        return repository.findById(id).map(aluno -> {
            aluno.setNome(dados.getNome());
            aluno.setCpf(dados.getCpf());
            aluno.setEmail(dados.getEmail());
            aluno.setDataNascimento(dados.getDataNascimento());
            aluno.setTurma(dados.getTurma());
            Aluno atualizado = repository.save(aluno);
            return ResponseEntity.ok(new AlunoDTO(atualizado));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return ResponseEntity.ok("Aluno deletado com sucesso.");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Aluno não encontrado.");
    }
}