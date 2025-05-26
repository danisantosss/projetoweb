package com.projetoweb.gerenciadorescolar.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.projetoweb.gerenciadorescolar.entity.Aluno;
import com.projetoweb.gerenciadorescolar.entity.Turma;
import com.projetoweb.gerenciadorescolar.repository.AlunoRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(AlunoController.class)
public class AlunoControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private AlunoRepository alunoRepository;

    @Autowired
    private ObjectMapper objectMapper;

    private Aluno criarAlunoDeTeste() {
        Turma turma = new Turma();
        turma.setId(1L);
        turma.setNome("1A");

        Aluno aluno = new Aluno();
        aluno.setId(1L);
        aluno.setNome("João");
        aluno.setCpf("12345678900");
        aluno.setEmail("joao@example.com");
        aluno.setDataNascimento(LocalDate.of(2000, 1, 1));
        aluno.setTurma(turma);
        return aluno;
    }

    @Test
    void criarNovoAluno() throws Exception {
        Aluno aluno = criarAlunoDeTeste();
        when(alunoRepository.save(any(Aluno.class))).thenReturn(aluno);

        mockMvc.perform(post("/aluno")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(aluno)))
            .andExpect(status().isCreated())
            .andExpect(jsonPath("$.nome").value("João"));
    }

    @Test
    void retornarTodosOsAlunos() throws Exception {
        Aluno aluno = criarAlunoDeTeste();
        when(alunoRepository.findAll()).thenReturn(List.of(aluno));

        mockMvc.perform(get("/aluno"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$[0].nome").value("João"));
    }

    @Test
    void atualizarAlunoExistente() throws Exception {
        Aluno aluno = criarAlunoDeTeste();
        when(alunoRepository.findById(1L)).thenReturn(Optional.of(aluno));
        when(alunoRepository.save(any(Aluno.class))).thenReturn(aluno);

        mockMvc.perform(put("/aluno/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(aluno)))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.nome").value("João"));
    }
}