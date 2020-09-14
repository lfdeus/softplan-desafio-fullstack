package com.lfdeus.softplan.repository;

import com.lfdeus.softplan.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    Optional<Usuario> findByUsernameAndPassword(String username, String password);

    Optional<Usuario> findByUsername(String username);

    List<Usuario> findByAtivo(boolean ativo);
}
