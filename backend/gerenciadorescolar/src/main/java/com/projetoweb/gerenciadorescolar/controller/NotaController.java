package com.projetoweb.gerenciadorescolar.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.projetoweb.gerenciadorescolar.entity.Aluno;
import com.projetoweb.gerenciadorescolar.entity.Nota;
import com.projetoweb.gerenciadorescolar.entity.Professor;
import com.projetoweb.gerenciadorescolar.entity.Turma;
import com.projetoweb.gerenciadorescolar.repository.AlunoRepository;
import com.projetoweb.gerenciadorescolar.repository.NotaRepository;
import com.projetoweb.gerenciadorescolar.repository.ProfessorRepository;

@RestController
@RequestMapping("/notas")
@CrossOrigin(origins = "http://localhost:5173")
public class NotaController {

    @Autowired
    private NotaRepository notaRepository;

    @Autowired
    private AlunoRepository alunoRepository;

    @Autowired
    private ProfessorRepository professorRepository;

    @GetMapping("/aluno/{alunoId}")
    public List<Nota> getNotasPorAluno(@PathVariable Long alunoId) {
        return notaRepository.findByAlunoId(alunoId);
    }

    @PostMapping
    public Nota salvarNota(@RequestBody Nota nota) {
        return notaRepository.save(nota);
    }

    @GetMapping("/professores-da-turma/{alunoId}")
    public List<Professor> getProfessoresDaTurma(@PathVariable Long alunoId) {
        Aluno aluno = alunoRepository.findById(alunoId).orElseThrow();
        Turma turma = aluno.getTurma();
        return professorRepository.findByTurmaId(turma.getId());
    }
}
