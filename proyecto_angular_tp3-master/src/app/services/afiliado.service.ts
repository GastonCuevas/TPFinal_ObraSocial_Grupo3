import { Injectable } from '@angular/core';
import { Afiliado } from '../models/afiliado';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AfiliadoService {
  urlBase: string = "http://localhost:3000/api/afiliados/"; 

  constructor(private _http:HttpClient) { }

  public agregarAfiliado(usu: Afiliado): Observable<any>{
    const HttpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    }
    var body = JSON.stringify(usu);
    return this._http.post(this.urlBase,body,HttpOptions);
  }
  public obtenerAfiliado(): Observable<any>{
    const HttpOptions = {
      headers: new HttpHeaders({
      })
    }
    return this._http.get(this.urlBase,HttpOptions);
  }
  updateAfiliado(afi: Afiliado):Observable<any>{

    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    };
    var body = JSON.stringify(afi);
    return this._http.put(this.urlBase + afi._id , body , httpOptions );    

  }
  public deleteAfiliado(afi: Afiliado):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({

      })
    };
    return this._http.delete( this.urlBase + afi._id , httpOptions );
  }

}
