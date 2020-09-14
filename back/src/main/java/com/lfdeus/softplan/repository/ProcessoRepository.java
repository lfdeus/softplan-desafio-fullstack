package com.lfdeus.softplan.repository;

import com.lfdeus.softplan.model.Processo;
import com.lfdeus.softplan.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.List;

public interface ProcessoRepository extends JpaRepository<Processo, Long> {

    List<Processo> findByUsuariosParecerContains(Usuario usuario);

    List<Processo> findByUsuariosParecerContainsAndDataParecer(Usuario usuario, Date dataParecer);

}
