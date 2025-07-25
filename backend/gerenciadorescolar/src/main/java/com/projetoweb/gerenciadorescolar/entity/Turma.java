package com.projetoweb.gerenciadorescolar.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Table(name = "turma")
@Entity
public class Turma {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private int anoLetivo;

    @OneToMany(mappedBy = "turma", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Aluno> alunos;

    @OneToMany(mappedBy = "turma", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Professor> professores;
}