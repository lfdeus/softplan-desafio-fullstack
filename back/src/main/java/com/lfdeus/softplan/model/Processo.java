package com.lfdeus.softplan.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.OneToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
public class Processo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String descricao;
    @Temporal(TemporalType.TIMESTAMP)
    private Date dataProcesso;
    @Column(columnDefinition = "text")
    private String processo;
    @OneToOne
    private Usuario usuarioProcesso;
    @OneToOne
    private Usuario usuarioParecer;
    @Temporal(TemporalType.TIMESTAMP)
    private Date dataParecer;
    @Column(columnDefinition = "text")
    private String parecer;
    @Column(columnDefinition = "boolean DEFAULT true")
    private boolean pendente = true;

    @ManyToMany
    private Set<Usuario> usuariosParecer;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public String getProcesso() {
        if (processo == null) {
            processo = "";
        }
        return processo;
    }

    public void setProcesso(String processo) {
        this.processo = processo;
    }

    public boolean isPendente() {
        return pendente;
    }

    public void setPendente(boolean pendente) {
        this.pendente = pendente;
    }

    public String getParecer() {
        if (parecer == null) {
            parecer = "";
        }
        return parecer;
    }

    public void setParecer(String parecer) {
        this.parecer = parecer;
    }

    public Date getDataProcesso() {
        return dataProcesso;
    }

    public void setDataProcesso(Date dataProcesso) {
        this.dataProcesso = dataProcesso;
    }

    public Date getDataParecer() {
        return dataParecer;
    }

    public void setDataParecer(Date dataParecer) {
        this.dataParecer = dataParecer;
    }

    public Usuario getUsuarioProcesso() {
        return usuarioProcesso;
    }

    public void setUsuarioProcesso(Usuario usuarioProcesso) {
        this.usuarioProcesso = usuarioProcesso;
    }

    public Usuario getUsuarioParecer() {
        return usuarioParecer;
    }

    public void setUsuarioParecer(Usuario usuarioParecer) {
        this.usuarioParecer = usuarioParecer;
    }

    public Set<Usuario> getUsuariosParecer() {
        if (usuariosParecer == null) {
            usuariosParecer = new HashSet<>();
        }
        return usuariosParecer;
    }

    public void setUsuariosParecer(Set<Usuario> usuariosParecer) {
        this.usuariosParecer = usuariosParecer;
    }
}
