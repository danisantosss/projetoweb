package com.projetoweb.gerenciadorescolar.entity;

public record TurmaDTO(
    Long id,
    String nome,
    int anoLetivo
) {
    public TurmaDTO(Turma turma) {
        this(
            turma.getId(),
            turma.getNome(),
            turma.getAnoLetivo()
        );
    }
}