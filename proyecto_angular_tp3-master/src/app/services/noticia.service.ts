import { Injectable } from '@angular/core';
import { Noticia } from '../models/noticia';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class NoticiaService {
  urlBase: string = "http://localhost:3000/api/noticias/"; 
  urlUsuario: string = "http://localhost:3000/api/usuarios/"; 

  constructor(private _http:HttpClient) { }


  public agregarNoticia(not: Noticia): Observable<any>{
    const HttpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    }
    var body = JSON.stringify(not);
    return this._http.post(this.urlBase,body,HttpOptions);
  }

  public obtenerNoticia(): Observable<any>{
    const HttpOptions = {
      headers: new HttpHeaders({
      })
    }
    return this._http.get(this.urlBase,HttpOptions);
  }

  updateNoticia(not: Noticia):Observable<any>{

    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    };
    var body = JSON.stringify(not);
    return this._http.put(this.urlBase + not._id , body , httpOptions );    
  }

  obtenerUsuario(usuID: string):Observable<any>{

    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    };
    return this._http.get(this.urlUsuario + usuID , httpOptions );
  }
}
