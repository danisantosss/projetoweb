package com.projetoweb.gerenciadorescolar.entity;

import lombok.Data;

@Data
public class UsuarioDTO {
    private String username;
    private String senha;

    public UsuarioDTO() {}

    public UsuarioDTO(String username, String senha) {
        this.username = username;
        this.senha = senha;
    }
}
