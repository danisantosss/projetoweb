package com.projetoweb.gerenciadorescolar.entity;

import java.time.LocalDate;

public record AlunoDTO(Long id,
    String nome,
    String cpf, 
    String email,
    LocalDate dataNascimento,
    Float nota1,
    Float nota2,
    Float nota3,
    TurmaDTO turma
) {
    public AlunoDTO(Aluno aluno){
        this(
            aluno.getId(),
            aluno.getNome(),
            aluno.getCpf(), 
            aluno.getEmail(),
            aluno.getDataNascimento(),
            aluno.getNota1(),
            aluno.getNota2(),
            aluno.getNota3(),
            aluno.getTurma() != null ? new TurmaDTO(aluno.getTurma()) : null
        );
    }
}