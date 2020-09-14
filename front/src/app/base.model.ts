export class UsuarioLogin {
  username?: string;
  password?: string;
}

export class Usuario {
  id?: number;
  nome?: string;
  username?: string;
  password?: string;
  perfil?: Perfil;
  ativo?: boolean;
}

export class Processo {
  id?: number;
  dataProcesso?: number;
  dataParecer?: number;
  descricao?: string;
  processo?: string;
  parecer?: string;
  usuarioProcesso?: Usuario;
  usuarioParecer?: Usuario;
  usuariosParecer?: Usuario[];
}

export enum Perfil {
  'ADMINISTRADOR' = 'ADMINISTRADOR',
  'TRIADOR' = 'TRIADOR',
  'FINALIZADOR' = 'FINALIZADOR'
}

export class Menu {
  nome: string;
  rota: string;
  icon: string;
  visible: boolean;
}
