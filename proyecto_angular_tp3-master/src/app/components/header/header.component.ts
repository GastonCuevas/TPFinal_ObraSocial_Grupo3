
import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  logIn = false;
  usuario = "";
  clave = "";
  esAdministrativo = false;
  esAdministrador = false;
  esGerente = false;
  esSocio = false;
  constructor(
    private usuarioService: UsuarioService) { }

  ngOnInit(): void {
  }

  IniciarSesion() {
    
    this.usuarioService.login(this.usuario, this.clave)
      .subscribe(
        (result) => {
         
          var user = result;
          var tipo = user.perfil;
          console.log(user);
          if (user.status == 1) {
            //vbles para mostrar-ocultar cosas en el header
            this.usuarioService.userLoggedIn = true;
            this.usuarioService.userLogged = user;
            this.logIn = true;
            console.log("tipo:", tipo)
            switch(tipo){
              case"administrativo":{
                this.esAdministrativo = true;
                console.log("es", tipo);
                console.log("Administrativo:", this.esAdministrativo);
                console.log("Administrador:", this.esAdministrador);
                console.log("Gerente:", this.esGerente);
                console.log("Socio:", this.esSocio);
                break;
              }
              case"administrador":{
                this.esAdministrador = true;
                console.log("es", tipo);
                console.log("Administrativo:", this.esAdministrativo);
                console.log("Administrador:", this.esAdministrador);
                console.log("Gerente:", this.esGerente);
                console.log("Socio:", this.esSocio);
                break;
              }
              case"gerente":{
                this.esGerente = true;
                console.log("es", tipo);
                console.log("Administrativo:", this.esAdministrativo);
                console.log("Administrador:", this.esAdministrador);
                console.log("Gerente:", this.esGerente);
                console.log("Socio:", this.esSocio);
                break;
              }
              case"socio":{
                this.esGerente = true;
                console.log("es", tipo);
                console.log("Administrativo:", this.esAdministrativo);
                console.log("Administrador:", this.esAdministrador);
                console.log("Gerente:", this.esGerente);
                console.log("Socio:", this.esSocio);
                break;
              }
            }
          } else {
            //usuario no encontrado  muestro mensaje en la vista
            alert("credenciales incorrectas");
            this.logIn = false;
          }
        },
        error => {
          console.log("error en conexion");
          console.log(error);
        });

  }
  

  CerrarSesion() {
    this.logIn = false;
  }

}
