import { Component, OnInit } from '@angular/core';
import { Noticia } from 'src/app/models/noticia';
import { Usuario } from 'src/app/models/usuario';
import { NoticiaService } from 'src/app/services/noticia.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  noticia: Noticia;
  noticias: Array<Noticia>;

  usuario: Usuario;
  usuarios: Array<Usuario>;

  mostrarBienvenida: boolean = false;
  mostrarPlanes: boolean = false;
  mostrarNoticias: boolean = true;

  constructor(private noticiaService: NoticiaService) {
    this.noticia = new Noticia();
    this.usuario = new Usuario();
    this.noticias = new Array<Noticia>();
    this.usuarios = new Array<Usuario>();
    this.cargarNoticias();
  }

  public bienvenida(){
    this.mostrarBienvenida = true;
    this.mostrarNoticias = false;
    this.mostrarPlanes = false;
  }

  public planes(){
    this.mostrarBienvenida = false;
    this.mostrarNoticias = false;
    this.mostrarPlanes = true;
  }

  public verNoticias(){
    this.mostrarBienvenida = false;
    this.mostrarNoticias = true;
    this.mostrarPlanes = false;
  }

  public cargarNoticias(){
    this.noticias = new Array<Noticia>();

    this.noticiaService.obtenerNoticia().subscribe(
      (result) => {
        var not: Noticia = new Noticia();
        result.forEach(element => {
          Object.assign(not, element);
          if(not.vigente == true){
            this.noticias.push(not);
          }
          not = new Noticia();
        });
      },
      (error) => {
        console.log(error);
      }
    )
  }

  ngOnInit(): void {
  }

}
