export class Usuario {
    _id: number;
    usuarioEmail: string;
    password: string;
    activo: boolean;
    perfil: string;

    Usuario(id?:number, usuarioEmail?:string, password?:string, activo?:boolean, perfil?:string){
      this._id = id;
      this.usuarioEmail = usuarioEmail;
      this.password = password;
      this.activo = activo;
      this.perfil = perfil;
    }
}

