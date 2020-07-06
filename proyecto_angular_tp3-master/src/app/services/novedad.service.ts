import { Injectable } from '@angular/core';
import { Novedad } from '../models/novedad';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NovedadService {
  urlBase: string = "http://localhost:3000/api/novedades/"; 
  constructor(private _http:HttpClient) { }

  public agregarNovedad(nov: Novedad): Observable<any>{
    const HttpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    }
    var body = JSON.stringify(nov);
    return this._http.post(this.urlBase,body,HttpOptions);
  }

  public obtenerNovedad(): Observable<any>{
    const HttpOptions = {
      headers: new HttpHeaders({
      })
    }
    return this._http.get(this.urlBase,HttpOptions);
  }

  updateNovedad(nov: Novedad):Observable<any>{

    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    };
    var body = JSON.stringify(nov);
    return this._http.put(this.urlBase + nov._id , body , httpOptions );    
  }


}
