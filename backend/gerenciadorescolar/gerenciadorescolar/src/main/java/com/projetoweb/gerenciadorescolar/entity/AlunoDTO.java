package com.projetoweb.gerenciadorescolar.entity;

import java.time.LocalDate;

public record AlunoDTO(Long id,
    String nome,
    String cpf, 
    String email,
    LocalDate dataNascimento,
    TurmaDTO turma
) {
    public AlunoDTO(Aluno aluno){
        this(
            aluno.getId(),
            aluno.getNome(),
            aluno.getCpf(), 
            aluno.getEmail(),
            aluno.getDataNascimento(),
            aluno.getTurma() != null ? new TurmaDTO(aluno.getTurma()) : null
        );
    }
}