import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  userLoggedIn: boolean = false;
  userLogged: Usuario;

  urlBase: string = "http://localhost:3000/api/usuarios/";
  urlAfi: string = "http://localhost:3000/api/afiliados/"; 

  constructor(private _http:HttpClient) { }


  public login(usuarioEmail: string, password: string):Observable<any> {
    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      }) 
    } 
    let body = JSON.stringify({ usuarioEmail: usuarioEmail, password: password });

    return this._http.post('http://localhost:3000/api/usuarios/login', body, httpOption);

  }

  public logout() {
    // reseteo las propiedades del service que indican 
    // que un usuari esta logueado y cual es el usuario logueado
    this.userLogged = new Usuario();
    this.userLoggedIn = false;  
  }  

  public agregarUsuario(usu: Usuario): Observable<any>{
    const HttpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    }
    var body = JSON.stringify(usu);
    return this._http.post(this.urlBase,body,HttpOptions);
  }

  public obtenerUsuario(): Observable<any>{
    const HttpOptions = {
      headers: new HttpHeaders({
      })
    }
    return this._http.get(this.urlBase,HttpOptions);
  }

  public obtenerAfiliados(): Observable<any>{
    const HttpOptions = {
      headers: new HttpHeaders({
      })
    }
    return this._http.get(this.urlAfi,HttpOptions);
  }

  updateUsuario(usu: Usuario):Observable<any>{

    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    };
    var body = JSON.stringify(usu);
    return this._http.put(this.urlBase + usu._id , body , httpOptions );    

  }

}
