import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Noticia } from 'src/app/models/noticia';
import { NoticiaService } from 'src/app/services/noticia.service';
import { ToastrService } from 'ngx-toastr';
import { FacebookService, InitParams, LoginResponse } from 'ngx-fb';
import { ApiMethod } from 'ngx-fb/dist/esm/providers/facebook';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.css']
})
export class NoticiaComponent implements OnInit {
  noticia: Noticia;
  noticias: Array<Noticia>;
  noticiaSeleccionada = new Noticia();
  usuario: Usuario;
  usuarios: Array<Usuario>;

  constructor(private noticiaService: NoticiaService, public usuarioService: UsuarioService, private _toastr: ToastrService, private facebookService: FacebookService) {
    this.noticias = new Array<Noticia>();
    this.noticia = new Noticia();
    this.usuario = new Usuario();
    this.usuarios = new Array<Usuario>();
    this.noticiaSeleccionada = new Noticia();


    this.cargarNoticias();
    this.cargarTabla();
    this.iniciarFb();
  }

  ngOnInit(): void {
  }
  public iniciarFb() {
    const initParams: InitParams = {
      appId: '704937213674405',
      autoLogAppEvents: true,
      xfbml: true,
      version: 'v7.0'
    };
    this.facebookService.init(initParams);
    console.log("facebook iniciado");
  };

  public postFb() {
    console.log("entro a post facebook");
    console.log(this.noticiaSeleccionada.descripcion);
    console.log(this.noticiaSeleccionada.fecha);
    console.log(this.noticiaSeleccionada.titulo);
    var apiMethod: ApiMethod = "post";
    this.facebookService.api('/105760337875016/feed', apiMethod,
      {
        message: this.noticiaSeleccionada.titulo +": "+ this.noticiaSeleccionada.descripcion,
        access_token: "EAAKBIvw1w6UBACXRAUhZBwKr5L7Un7yDuclBIP8Aftjlj1XqDlvfyxv6jtgZB3Vi3u7EmqUjl8oQoxLttG2ey2M4UFDfO5C7TFVZCWEeW7RYDHDlzGl4eLitxswZAbkEgizbWVdeCKD9v2IaGnW4bZA8ZBMMQoO0k269ekPS9t8O3wUob3J2OPltDdEFZBdWGvOZCPAufVF9ZAQZDZD"
      });

  }


  mensajeExitoCarga() {
    this._toastr.success("La noticia ha sido cargada correctamente", "Exito");
  }
  mensajeExitoModificado() {
    this._toastr.success("La noticia ha sido modificada correctamente", "Exito");
  }
  mensajeExitoEliminado() {
    this._toastr.success("La noticia ya no está vigente", "Exito");
  }
  mensajeExitoActivado() {
    this._toastr.success("La noticia está vigente", "Exito");
  }
  mensajeFallaError(mensaje) {
    this._toastr.warning(mensaje);
  }

  public cargarNoticias() {
    this.noticias = new Array<Noticia>();
    this.noticiaService.obtenerNoticia().subscribe(
      (result) => {
        var not: Noticia = new Noticia();
        result.forEach(element => {
          Object.assign(not, element);
          this.noticias.push(not);
          console.log(not);
          console.log(not.usuario.usuarioEmail);
          not = new Noticia();
        });
      },
      (error) => {
        console.log(error);
        this.mensajeFallaError(error);
      }
    )
  }
  public seleccionarNoticia(not: Noticia) {
    this.noticiaSeleccionada = not;
  }


  public crearNoticia() {
    console.log(this.usuarioService.userLogged)
    this.noticia.vigente = true;
    this.noticia.usuario = this.usuarios.find((item: Usuario) => item.usuarioEmail == this.usuarioService.userLogged.usuarioEmail);
    this.noticia.fecha = new Date();
    this.postFb2();
    this.noticiaService.agregarNoticia(this.noticia).subscribe(
      (result) => {
        this.cargarNoticias();
        this.mensajeExitoCarga();
        this.noticia = new Noticia();
      },
      (error) => {
        console.log(error);
      }
    )
  }

  public postFb2() {
    console.log("entro a post facebook");
    console.log(this.noticia.descripcion);
    console.log(this.noticia.fecha);
    console.log(this.noticia.titulo);
    var apiMethod: ApiMethod = "post";
    this.facebookService.api('/105760337875016/feed', apiMethod,
      {
        message: this.noticia.titulo +": "+ this.noticia.descripcion,
        access_token: "EAAKBIvw1w6UBACXRAUhZBwKr5L7Un7yDuclBIP8Aftjlj1XqDlvfyxv6jtgZB3Vi3u7EmqUjl8oQoxLttG2ey2M4UFDfO5C7TFVZCWEeW7RYDHDlzGl4eLitxswZAbkEgizbWVdeCKD9v2IaGnW4bZA8ZBMMQoO0k269ekPS9t8O3wUob3J2OPltDdEFZBdWGvOZCPAufVF9ZAQZDZD"
      });

  }

  public modificarNoticia() {
    this.noticiaService.updateNoticia(this.noticiaSeleccionada).subscribe(
      (result) => {
        this.mensajeExitoModificado();
        this.noticiaSeleccionada = new Noticia();
        this.cargarTabla();
      },
      (error) => {
        console.log(error);
        this.mensajeFallaError(error);
      }
    );
  }


  public borrarNoticia(not: Noticia) {
    not.vigente = false;

    this.noticiaService.updateNoticia(not).subscribe(
      (result) => {
        this.mensajeExitoEliminado();
        not = new Noticia();
        this.cargarTabla();
      },
      (error) => {
        console.log(error);
        this.mensajeFallaError(error);
      }
    );
  }
  public activarNoticia(not: Noticia) {
    not.vigente = true;

    this.noticiaService.updateNoticia(not).subscribe(
      (result) => {
        this.mensajeExitoActivado();
        not = new Noticia();
        this.cargarTabla();
      },
      (error) => {
        console.log(error);
        this.mensajeFallaError(error);
      }
    );
  }


  public cargarTabla() {
    this.usuarios = new Array<Usuario>();
    this.usuarioService.obtenerUsuario().subscribe(
      (result) => {
        var usu: Usuario = new Usuario();
        result.forEach(element => {
          Object.assign(usu, element);
          this.usuarios.push(usu);
          usu = new Usuario();
        });
      },
      (error) => {
        console.log(error);
      }
    )
  }





}
