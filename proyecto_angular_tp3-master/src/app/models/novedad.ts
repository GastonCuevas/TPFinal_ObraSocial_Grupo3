import { Usuario } from './usuario'

export class Novedad {
    _id: string;
    usuario: Usuario;
    texto: string;
    estado: string;
    respuesta: string;

    Novedad(_id?: string, texto?: string, estado?: string, usuario?:
        Usuario, respuesta?: string) {
        this._id = _id;
        this.texto = texto;
        this.estado = estado;
        this.respuesta = respuesta;
        this.usuario = usuario;
    }
}
