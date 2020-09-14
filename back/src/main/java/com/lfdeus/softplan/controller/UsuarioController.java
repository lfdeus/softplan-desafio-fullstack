package com.lfdeus.softplan.controller;

import com.lfdeus.softplan.dto.UsuarioDTO;
import com.lfdeus.softplan.model.PerfilEnum;
import com.lfdeus.softplan.model.Usuario;
import com.lfdeus.softplan.repository.UsuarioRepository;
import com.lfdeus.softplan.uteis.Uteis;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("usuario")
public class UsuarioController {

    private final UsuarioRepository repo;

    public UsuarioController(UsuarioRepository usuarioRepository) {
        this.repo = usuarioRepository;
    }

    @ResponseBody
    @RequestMapping(method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity todos(@RequestParam(required = false, name = "ativo") String somenteAtivos) {
        try {
            boolean somenteUsuarioAtivo = (somenteAtivos != null && somenteAtivos.equalsIgnoreCase("t"));
            List<Usuario> lista;
            if (somenteUsuarioAtivo) {
                lista = repo.findByAtivo(somenteUsuarioAtivo);
            } else {
                lista = repo.findAll();
            }
            List<UsuarioDTO> listaDTO = new ArrayList<>();
            for (Usuario usuario : lista) {
                listaDTO.add(new UsuarioDTO(usuario));
            }
            return new ResponseEntity<>(listaDTO, HttpStatus.OK);
        } catch (Exception ex) {
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @ResponseBody
    @RequestMapping(path = "/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity usuario(@PathVariable Long id) {
        try {
            Optional<Usuario> usuarioData = repo.findById(id);
            if (usuarioData.isPresent()) {
                return new ResponseEntity<>(new UsuarioDTO(usuarioData.get()), HttpStatus.OK);
            }
            return new ResponseEntity<>("Usuário não encontrado", HttpStatus.NOT_FOUND);
        } catch (Exception ex) {
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @ResponseBody
    @RequestMapping(method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity save(@RequestBody UsuarioDTO dto) {
        try {
            dto.validarDados(true);
            Optional<Usuario> usuarioData = repo.findByUsername(dto.getUsername().toUpperCase());
            if (usuarioData.isPresent()) {
                throw new Exception("Já existe um usuário com o username \"" + dto.getUsername() + "\".");
            }

            Usuario usuario = new Usuario();
            usuario.setId(null);
            usuario.setDataRegistro(new Date());
            usuario.setAtivo(dto.isAtivo());
            usuario.setUsername(dto.getUsername().toUpperCase());
            usuario.setNome(dto.getNome());
            usuario.setPerfil(PerfilEnum.valueOf(dto.getPerfil()));
            usuario.setPassword(Uteis.encryptMD5(dto.getPassword()));
            return new ResponseEntity<>(new UsuarioDTO(repo.save(usuario)), HttpStatus.CREATED);
        } catch (Exception ex) {
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @ResponseBody
    @RequestMapping(path = "/{id}", method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity update(@PathVariable Long id,
                                 @RequestBody UsuarioDTO dto) {
        try {
            dto.validarDados(false);

            Optional<Usuario> usuarioData = repo.findById(id);
            if (usuarioData.isEmpty()) {
                return new ResponseEntity<>("Usuário não encontrado", HttpStatus.NOT_FOUND);
            }

            Optional<Usuario> usuarioValida = repo.findByUsername(dto.getUsername().toUpperCase());
            if (usuarioValida.isPresent() && !usuarioValida.get().getId().equals(usuarioData.get().getId())) {
                throw new Exception("Já existe um usuário com o username \"" + dto.getUsername() + "\".");
            }

            Usuario usuarioNew = usuarioData.get();
            usuarioNew.setNome(dto.getNome());
            usuarioNew.setUsername(dto.getUsername().toUpperCase());
            usuarioNew.setPerfil(PerfilEnum.valueOf(dto.getPerfil()));
            usuarioNew.setAtivo(dto.isAtivo());
            if (!dto.getPassword().isEmpty()) {
                usuarioNew.setPassword(Uteis.encryptMD5(dto.getPassword()));
            }
            return new ResponseEntity<>(new UsuarioDTO(repo.save(usuarioNew)), HttpStatus.OK);
        } catch (Exception ex) {
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @ResponseBody
    @RequestMapping(path = "/{id}", method = RequestMethod.DELETE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity delete(@PathVariable Long id) {
        try {
            Optional<Usuario> usuarioData = repo.findById(id);
            if (usuarioData.isPresent()) {
                repo.deleteById(id);
                return new ResponseEntity<>(HttpStatus.OK);
            }
            return new ResponseEntity<>("Usuário não encontrado", HttpStatus.NOT_FOUND);
        } catch (Exception ex) {
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
