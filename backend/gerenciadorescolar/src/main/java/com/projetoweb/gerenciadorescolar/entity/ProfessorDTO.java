package com.projetoweb.gerenciadorescolar.entity;

import java.util.List;

public record ProfessorDTO(
    Long id,
    String nome,
    String cpf,
    String email,
    String disciplina,
    List<TurmaDTO> turmas
) {
    public ProfessorDTO(Professor professor) {
        this(
            professor.getId(),
            professor.getNome(),
            professor.getCpf(),
            professor.getEmail(),
            professor.getDisciplina(),
            professor.getTurmas().stream()
                     .map(TurmaDTO::new)
                     .toList()
        );
    }
}