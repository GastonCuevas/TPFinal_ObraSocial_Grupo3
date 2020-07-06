import { Injectable } from '@angular/core';
import { Pago } from '../models/pago';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PagoService {
  urlBase: string = "http://localhost:3000/api/pagos/"; 
  urlUsuario: string = "http://localhost:3000/api/afiliados/"; 
  constructor(private _http:HttpClient) { }

  public agregarPago(pag: Pago): Observable<any>{
    const HttpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    }
    var body = JSON.stringify(pag);
    return this._http.post(this.urlBase,body,HttpOptions);
  }

  public obtenerPago(): Observable<any>{
    const HttpOptions = {
      headers: new HttpHeaders({
      })
    }
    return this._http.get(this.urlBase,HttpOptions);
  }

  updatePago(pag: Pago):Observable<any>{

    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    };
    var body = JSON.stringify(pag);
    return this._http.put(this.urlBase + pag._id , body , httpOptions );    
  }
  
}
