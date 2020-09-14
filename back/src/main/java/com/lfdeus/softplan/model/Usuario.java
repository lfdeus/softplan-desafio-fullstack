package com.lfdeus.softplan.model;

import com.lfdeus.softplan.dto.UsuarioDTO;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import java.util.Date;


@Entity
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Temporal(TemporalType.TIMESTAMP)
    private Date dataRegistro;
    @Column(unique = true)
    private String username;
    private String password;
    private String nome;
    @Enumerated(EnumType.ORDINAL)
    private PerfilEnum perfil = PerfilEnum.ADMINISTRADOR;
    @Column(columnDefinition = "boolean DEFAULT true")
    private boolean ativo = true;

    public Usuario() {

    }

    public Usuario(UsuarioDTO dto) {
        this.id = dto.getId();
        this.username = dto.getUsername();
        this.nome = dto.getNome();
        this.password = dto.getPassword();
        this.perfil = PerfilEnum.valueOf(dto.getPerfil());
        this.ativo = dto.isAtivo();

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Date getDataRegistro() {
        return dataRegistro;
    }

    public void setDataRegistro(Date dataRegistro) {
        this.dataRegistro = dataRegistro;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public boolean isAtivo() {
        return ativo;
    }

    public void setAtivo(boolean ativo) {
        this.ativo = ativo;
    }

    public PerfilEnum getPerfil() {
        return perfil;
    }

    public void setPerfil(PerfilEnum perfil) {
        this.perfil = perfil;
    }
}
