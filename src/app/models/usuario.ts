export class Usuario {
  public mdl_correo: string;
  public mdl_contrasena: string;
  public mdl_nombre: string;
  public mdl_pregunta: string;
  public mdl_respuesta: string;
  public usuario?: Usuario;

  constructor(
    mdl_correo: string,
    mdl_contrasena: string,
    mdl_nombre: string,
    mdl_pregunta: string,
    mdl_respuesta: string
  ) {
    this.mdl_correo = mdl_correo;
    this.mdl_contrasena = mdl_contrasena;
    this.mdl_nombre = mdl_nombre;
    this.mdl_pregunta = mdl_pregunta;
    this.mdl_respuesta = mdl_respuesta;
  }

  public listaUsuariosValidos(): Usuario[] {
    const lista = [];
    lista.push(new Usuario('atorres@duocuc.cl', '1234', 'Ana Torres Leiva'
      , '¿Cuál es tu animal favorito?', 'gato'));
    lista.push(new Usuario('admin', '1234', 'Lolito Perez'
      , '¿Cuál es tu animal favorito?', 'gato'));
    lista.push(new Usuario('avalenzuela@duocuc.cl', 'qwer', 'Alberto Valenzuela Nuñez'
      , '¿Nombre de su mejor amigo ?', 'Juanito'));
    lista.push(new Usuario('cfuentes@duocuc.cl', 'asdf', 'Carla Fuentes Gonzales'
      , '¿Lugar de nacimiento de su madre?', 'valparaiso'));
    return lista;
  }

  public buscarUsuarioValido(mdl_correo: string, mdl_contrasena: string): Usuario | undefined {
    return this.listaUsuariosValidos().find(usuario => usuario.mdl_correo === mdl_correo && usuario.mdl_contrasena === mdl_contrasena);
  }

  public buscarUsuarioPorCorreo(mdl_correo: string): Usuario | undefined {
    return this.listaUsuariosValidos().find(usuario => usuario.mdl_correo === mdl_correo);
  }

  
  public validarcorreo(): string {
    if (this.mdl_correo.trim() === '') {
      return 'Al ingresar en el sistema debe ingresar un nombre de usuario.';
    }
    if (this.mdl_correo.length < 3 || this.mdl_correo.length > 8) {
      return 'El nombre de usuario debe tener entre 3 y 8 caracteres.';
    }
    return '';
  }

  public validarPassword(): string {
    if (this.mdl_contrasena.trim() === '') {
      return 'Para entrar al sistema debe ingresar la contraseña.';
    }
    
    if (this.mdl_contrasena.length !== 4) {
      return 'La contraseña debe tener 4 caracteres.';
    }
    return '';
  }

  public validarUsuario(): string {
    return this.validarcorreo()
      || this.validarPassword();
  }
}
