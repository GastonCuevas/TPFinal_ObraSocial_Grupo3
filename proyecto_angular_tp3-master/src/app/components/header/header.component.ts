import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
  }

  IniciarSesion(){
    this.logIn = true;
    this.esAdministrativo = true;
  }

  CerrarSesion(){
    this.logIn = false;
  }

}
