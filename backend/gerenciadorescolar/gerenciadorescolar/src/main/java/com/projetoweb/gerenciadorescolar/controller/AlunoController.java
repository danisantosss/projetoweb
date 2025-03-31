package com.projetoweb.gerenciadorescolar.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.projetoweb.gerenciadorescolar.entity.Aluno;
import com.projetoweb.gerenciadorescolar.entity.AlunoDTO;
import com.projetoweb.gerenciadorescolar.repository.AlunoRepository;

@RestController
@RequestMapping("aluno")
public class AlunoController {

    @Autowired
    private AlunoRepository repository;

    @GetMapping
    public List<AlunoDTO> getAll(){
        List<AlunoDTO> listaAlunos = repository.findAll().stream().map(AlunoDTO::new).toList();
        return listaAlunos;
    }
}