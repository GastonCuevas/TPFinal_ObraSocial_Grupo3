import { Afiliado } from './afiliado'

export class Pago {
    _id: string;
    afiliado: Afiliado;
    fecha: Date;
    monto: number;
    anio: number;
    mes: number;

    Pago(_id?:string, afiliado?: Afiliado, fecha?: Date, monto?:
        number, anio?:number,mes?:number){
        this._id = _id;
        this.afiliado = afiliado;
        this.fecha = fecha;
        this.monto = monto;
        this.anio = anio;
        this.mes = mes;
   }
}

