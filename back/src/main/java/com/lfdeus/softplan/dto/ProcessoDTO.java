package com.lfdeus.softplan.dto;

import com.lfdeus.softplan.model.Processo;
import com.lfdeus.softplan.model.Usuario;
import com.lfdeus.softplan.uteis.Uteis;

import java.util.ArrayList;
import java.util.List;

public class ProcessoDTO {

    private Long id;
    private String descricao;
    private String processo;
    private String parecer;
    private Long dataProcesso;
    private Long dataParecer;
    private UsuarioDTO usuarioProcesso;
    private UsuarioDTO usuarioParecer;
    private List<UsuarioDTO> usuariosParecer;

    public ProcessoDTO() {
    }

    public ProcessoDTO(Processo processo) {
        this.id = processo.getId();
        this.descricao = processo.getDescricao();
        this.processo = processo.getProcesso();
        this.dataProcesso = processo.getDataProcesso().getTime();
        this.usuarioProcesso = new UsuarioDTO(processo.getUsuarioProcesso());
        if (processo.getUsuarioParecer() != null) {
            this.usuarioParecer = new UsuarioDTO(processo.getUsuarioParecer());
            this.dataParecer = processo.getDataParecer().getTime();
            this.parecer = processo.getParecer();
        }

        this.usuariosParecer = new ArrayList<>();
        for (Usuario usuario : processo.getUsuariosParecer()){
            this.usuariosParecer.add(new UsuarioDTO(usuario));
        }
    }

    public void validarDados(boolean validarParecer) throws Exception {
        if (this.getDescricao().isEmpty()) {
            throw new Exception("Descrição não informada");
        }
        if (this.getProcesso().isEmpty()) {
            throw new Exception("Processo não informado");
        }
        if (this.getUsuarioProcesso() == null || Uteis.emptyNumber(this.getUsuarioProcesso().getId())) {
            throw new Exception("Usuário processo não informado");
        }
        if (validarParecer) {
            if (this.getParecer().isEmpty()) {
                throw new Exception("Parecer não informado");
            }
            if (this.getUsuarioParecer() == null || Uteis.emptyNumber(this.getUsuarioParecer().getId())) {
                throw new Exception("Usuário parecer não informado");
            }
        }
    }

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
        return processo;
    }

    public void setProcesso(String processo) {
        this.processo = processo;
    }

    public String getParecer() {
        return parecer;
    }

    public void setParecer(String parecer) {
        this.parecer = parecer;
    }

    public UsuarioDTO getUsuarioProcesso() {
        return usuarioProcesso;
    }

    public void setUsuarioProcesso(UsuarioDTO usuarioProcesso) {
        this.usuarioProcesso = usuarioProcesso;
    }

    public UsuarioDTO getUsuarioParecer() {
        return usuarioParecer;
    }

    public void setUsuarioParecer(UsuarioDTO usuarioParecer) {
        this.usuarioParecer = usuarioParecer;
    }

    public List<UsuarioDTO> getUsuariosParecer() {
        if (usuariosParecer == null) {
            usuariosParecer = new ArrayList<>();
        }
        return usuariosParecer;
    }

    public void setUsuariosParecer(List<UsuarioDTO> usuariosParecer) {
        this.usuariosParecer = usuariosParecer;
    }

    public Long getDataProcesso() {
        return dataProcesso;
    }

    public void setDataProcesso(Long dataProcesso) {
        this.dataProcesso = dataProcesso;
    }

    public Long getDataParecer() {
        return dataParecer;
    }

    public void setDataParecer(Long dataParecer) {
        this.dataParecer = dataParecer;
    }
}
