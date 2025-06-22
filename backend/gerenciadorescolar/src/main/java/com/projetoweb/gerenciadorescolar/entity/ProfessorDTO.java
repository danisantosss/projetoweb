package com.projetoweb.gerenciadorescolar.entity;

public record ProfessorDTO(
    Long id,
    String nome,
    String cpf,
    String email,
    String disciplina,
    TurmaDTO turma
) {
    public ProfessorDTO(Professor professor) {
        this(
            professor.getId(),
            professor.getNome(),
            professor.getCpf(),
            professor.getEmail(),
            professor.getDisciplina(),
            professor.getTurma() != null ? new TurmaDTO(professor.getTurma()) : null
        );
    }
}