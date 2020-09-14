package com.lfdeus.softplan.dto;

import com.lfdeus.softplan.model.Usuario;

public class UsuarioDTO {

    private Long id;
    private String nome;
    private String username;
    private String password;
    private String perfil;
    private boolean ativo = true;

    public UsuarioDTO() {

    }

    public UsuarioDTO(Usuario usuario) {
        this.id = usuario.getId();
        this.nome = usuario.getNome();
        this.username = usuario.getUsername();
        this.perfil = usuario.getPerfil().name();
        this.ativo = usuario.isAtivo();
    }

    public void validarDados(boolean validarPassword) throws Exception {
        if (this.getUsername().isEmpty()) {
            throw new Exception("Username não informado");
        }
        if (this.getNome().isEmpty()) {
            throw new Exception("Nome não informado");
        }
        if (validarPassword && this.getPassword().isEmpty()) {
            throw new Exception("Password não informado");
        }
    }

    public String getNome() {
        if (nome == null) {
            nome = "";
        }
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getUsername() {
        if (username == null) {
            username = "";
        }
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        if (password == null) {
            password = "";
        }
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public boolean isAtivo() {
        return ativo;
    }

    public void setAtivo(boolean ativo) {
        this.ativo = ativo;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPerfil() {
        return perfil;
    }

    public void setPerfil(String perfil) {
        this.perfil = perfil;
    }
}
