package com.lfdeus.softplan.model;

public enum PerfilEnum {

    ADMINISTRADOR(0, "Administrador"),
    TRIADOR(1, "Usuário Triador"),
    FINALIZADOR(2, "Usuário Finalizador");

    private Integer id;
    private String descricao;

    PerfilEnum(Integer id, String descricao) {
        this.id = id;
        this.descricao = descricao;
    }

    public Integer getId() {
        return id;
    }

    public String getDescricao() {
        return descricao;
    }

    public static PerfilEnum getFromId(Integer id) {
        if (id == null) {
            return null;
        }
        for (PerfilEnum perfilEnum : PerfilEnum.values()) {
            if (perfilEnum.getId().equals(id)) {
                return perfilEnum;
            }
        }
        return null;
    }
}

