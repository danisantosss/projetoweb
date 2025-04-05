package com.projetoweb.gerenciadorescolar.entity;

import java.util.List;

public record TurmaDTO(
    Long id,
    String nome,
    int anoLetivo,
    List<ProfessorDTO> professores,
    List<AlunoDTO> alunos
) {
    public TurmaDTO(Turma turma) {
        this(
            turma.getId(),
            turma.getNome(),
            turma.getAnoLetivo(),
            turma.getProfessores().stream()
                .map(ProfessorDTO::new)
                .toList(),
            turma.getAlunos().stream()
                .map(AlunoDTO::new)
                .toList()
        );
    }
}