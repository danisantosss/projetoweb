package com.projetoweb.gerenciadorescolar.controller;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.times;

import java.util.List;
import java.util.Optional;
import java.util.ArrayList;

import com.projetoweb.gerenciadorescolar.entity.Professor;
import com.projetoweb.gerenciadorescolar.entity.ProfessorDTO;
import com.projetoweb.gerenciadorescolar.repository.ProfessorRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.*;

public class ProfessorControllerTest {

    @Mock
    private ProfessorRepository professorRepository;

    @InjectMocks
    private ProfessorController professorController;

    private Professor professorExemplo;

    @BeforeEach
    void setup() {
        MockitoAnnotations.openMocks(this);

        professorExemplo = new Professor();
        professorExemplo.setId(1L);
        professorExemplo.setNome("João");
        professorExemplo.setCpf("12345678900");
        professorExemplo.setEmail("joao@example.com");
        professorExemplo.setDisciplina("Matemática");
    }

    @Test
    void deveCriarProfessor() {
        when(professorRepository.save(any(Professor.class))).thenReturn(professorExemplo);

        ResponseEntity<ProfessorDTO> response = professorController.create(professorExemplo);

        assertEquals(201, response.getStatusCodeValue());
        assertEquals(professorExemplo.getNome(), response.getBody().nome());
    }

    @Test
    void deveRetornarListaProfessores() {
        List<Professor> lista = new ArrayList<>();
        lista.add(professorExemplo);

        when(professorRepository.findAll()).thenReturn(lista);

        List<ProfessorDTO> response = professorController.getAll();

        assertFalse(response.isEmpty());
        assertEquals(professorExemplo.getNome(), response.get(0).nome());
    }

    @Test
    void deveAtualizarProfessorExistente() {
        Professor professorAtualizado = new Professor();
        professorAtualizado.setNome("João Atualizado");
        professorAtualizado.setCpf("12345678900");
        professorAtualizado.setEmail("joao_atualizado@example.com");
        professorAtualizado.setDisciplina("Física");

        when(professorRepository.findById(1L)).thenReturn(Optional.of(professorExemplo));
        when(professorRepository.save(any(Professor.class))).thenReturn(professorAtualizado);

        ResponseEntity<ProfessorDTO> response = professorController.update(1L, professorAtualizado);

        assertEquals(200, response.getStatusCodeValue());
        assertEquals("João Atualizado", response.getBody().nome());
    }

    @Test
    void deveRetornar404QuandoAtualizarProfessorInexistente() {
        when(professorRepository.findById(99L)).thenReturn(Optional.empty());

        ResponseEntity<ProfessorDTO> response = professorController.update(99L, professorExemplo);

        assertEquals(404, response.getStatusCodeValue());
    }

    @Test
    void deveDeletarProfessorExistente() {
        when(professorRepository.existsById(1L)).thenReturn(true);

        ResponseEntity<String> response = professorController.delete(1L);

        assertEquals(200, response.getStatusCodeValue());
        verify(professorRepository, times(1)).deleteById(1L);
    }

    @Test
    void deveRetornar404QuandoDeletarProfessorInexistente() {
        when(professorRepository.existsById(99L)).thenReturn(false);

        ResponseEntity<String> response = professorController.delete(99L);

        assertEquals(404, response.getStatusCodeValue());
    }
}