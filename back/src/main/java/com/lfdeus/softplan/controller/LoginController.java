package com.lfdeus.softplan.controller;

import com.lfdeus.softplan.dto.UsuarioDTO;
import com.lfdeus.softplan.dto.UsuarioLoginDTO;
import com.lfdeus.softplan.model.Usuario;
import com.lfdeus.softplan.repository.UsuarioRepository;
import com.lfdeus.softplan.uteis.Uteis;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("login")
public class LoginController {

    private final UsuarioRepository repo;

    public LoginController(UsuarioRepository usuarioRepository) {
        this.repo = usuarioRepository;
    }

    @ResponseBody
    @RequestMapping(method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiOperation(value = "Retorna os dados do usuário que soliciou login", response = UsuarioDTO.class)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Sucesso"),
            @ApiResponse(code = 404, message = "Usuário não encontrado"),
            @ApiResponse(code = 500, message = "Erro interno, verifique a mensagem de retorno"),
    }
    )
    public ResponseEntity login(@RequestBody UsuarioLoginDTO dto) {
        try {
            Optional<Usuario> usuarioData = repo.findByUsernameAndPassword(dto.getUsername().toUpperCase(), Uteis.encryptMD5(dto.getPassword()));
            if (usuarioData.isPresent()) {
                if (usuarioData.get().isAtivo()) {
                    return new ResponseEntity<>(new UsuarioDTO(usuarioData.get()), HttpStatus.OK);
                } else {
                    return new ResponseEntity<>("Usuário inativo", HttpStatus.NOT_FOUND);
                }
            }
            return new ResponseEntity<>("Usuário não encontrado", HttpStatus.NOT_FOUND);
        } catch (Exception ex) {
            ex.printStackTrace();
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
