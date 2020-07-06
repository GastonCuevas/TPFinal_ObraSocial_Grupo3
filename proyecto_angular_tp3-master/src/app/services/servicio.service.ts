import { Injectable } from '@angular/core';
import { Servicio } from '../models/servicio';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {
  urlBase: string = "http://localhost:3000/api/servicios/"; 
  urlUsuario: string = "http://localhost:3000/api/afiliados/"; 
  constructor(private _http:HttpClient) { }

  public agregarServicio(ser: Servicio): Observable<any>{
    const HttpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    }
    var body = JSON.stringify(ser);
    return this._http.post(this.urlBase,body,HttpOptions);
  }

  public obtenerServicio(): Observable<any>{
    const HttpOptions = {
      headers: new HttpHeaders({
      })
    }
    return this._http.get(this.urlBase,HttpOptions);
  }

  updateServicio(ser: Servicio):Observable<any>{

    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    };
    var body = JSON.stringify(ser);
    return this._http.put(this.urlBase + ser._id , body , httpOptions );    
  }
  
}


