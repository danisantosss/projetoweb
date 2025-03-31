package com.projetoweb.gerenciadorescolar.entity;

import java.util.Date;

public record AlunoDTO(Long id, String nome, String cpf, 
String email, Date dataNascimento) {
    public AlunoDTO(Aluno aluno){
        this(aluno.getId(), aluno.getNome(), aluno.getCpf(), 
        aluno.getEmail(), aluno.getDataNascimento());
    }
}
