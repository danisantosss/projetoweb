package com.projetoweb.gerenciadorescolar.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.projetoweb.gerenciadorescolar.entity.Turma;
import com.projetoweb.gerenciadorescolar.repository.TurmaRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(TurmaController.class)
public class TurmaControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private TurmaRepository turmaRepository;

    @Autowired
    private ObjectMapper objectMapper;

    private Turma turma;

    @BeforeEach
    public void setup() {
        turma = new Turma();
        turma.setId(1L);
        turma.setNome("Turma A");
        turma.setAnoLetivo(2024);
    }

    @Test
    public void deveCriarNovaTurma() throws Exception {
        Mockito.when(turmaRepository.save(any(Turma.class))).thenReturn(turma);

        mockMvc.perform(post("/turma")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(turma)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(turma.getId()));
    }

    @Test
    public void deveRetornarTodasAsTurmas() throws Exception {
        Mockito.when(turmaRepository.findAll()).thenReturn(List.of(turma));

        mockMvc.perform(get("/turma"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value(turma.getId()));
    }

    @Test
    public void deveAtualizarTurmaExistente() throws Exception {
        Mockito.when(turmaRepository.findById(1L)).thenReturn(Optional.of(turma));
        Mockito.when(turmaRepository.save(any(Turma.class))).thenReturn(turma);

        mockMvc.perform(put("/turma/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(turma)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(turma.getId()));
    }

    @Test
    public void deveDeletarTurmaExistente() throws Exception {
        Mockito.when(turmaRepository.existsById(1L)).thenReturn(true);

        mockMvc.perform(delete("/turma/1"))
                .andExpect(status().isOk())
                .andExpect(content().string("Turma deletada com sucesso!"));
    }

    @Test
    public void deveRetornarNotFoundAoDeletarTurmaInexistente() throws Exception {
        Mockito.when(turmaRepository.existsById(1L)).thenReturn(false);

        mockMvc.perform(delete("/turma/1"))
                .andExpect(status().isNotFound())
                .andExpect(content().string("Turma não encontrada."));
    }
}