import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Afiliado } from 'src/app/models/afiliado';
import { AfiliadoService } from 'src/app/services/afiliado.service';
import { ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-afiliado',
  templateUrl: './afiliado.component.html',
  styleUrls: ['./afiliado.component.css']
})
export class AfiliadoComponent implements OnInit {
  afiliado: Afiliado;
  afiliadoSeleccionado: Afiliado;

  afiliados: Array<Afiliado>;
  emails: Array<string> = [];
  band: Boolean = false;
  usuarios: Array<Usuario>;
  usuarioEliminado: Usuario;
  mostrarPassword: boolean = true;
  mostrarSelect: boolean = false;

  constructor(private afiliadoService: AfiliadoService, public usuarioService: UsuarioService,private _toastr:ToastrService) {
    this.afiliado = new Afiliado();
    this.afiliadoSeleccionado = new Afiliado();
    this.afiliados = new Array<Afiliado>();
    this.usuarioEliminado = new Usuario();
    this.usuarios = new Array<Usuario>();
    this.cargarTabla();
    this.cargarEmails();
  }

  mensajeExitoCarga(){
    this._toastr.success("El afiliado ha sido cargado correctamente", "Exito");
  }
  mensajeExitoModificado(){
    this._toastr.success("El afiliado ha sido modificado correctamente", "Exito");
  }
  mensajeExitoEliminado(){
    this._toastr.success("El afiliado ha sido eliminado correctamente", "Exito");
  }
  mensajeExitoEliminadoUsuario(){
    this._toastr.success("El usuario del afiliado ha sido dado de baja correctamente", "Exito");
  }
  mensajeFallaEmailRepetido(){
    this._toastr.error("Este e-mail ya está registrado", "Falla");
  }
  mensajeFallaError(mensaje){
    this._toastr.warning(mensaje);
  }
  ngOnInit(): void {
  }
  public crearAfiliado() {

    this.verificarAfiliado();

    if (this.band == false) {
      this.afiliadoService.agregarAfiliado(this.afiliado).subscribe(
        (result) => {
          this.mensajeExitoCarga();
          this.cargarTabla();
          this.afiliado = new Afiliado();
        },
        (error) => {
          console.log(error);
        }
      )
    } else {
      this.mensajeFallaEmailRepetido();
    }


  }
  public seleccionarAfiliado(afi: Afiliado) {
    this.afiliadoSeleccionado = afi;
  }


  public cargarUsuarios(){
    this.usuarios = new Array;
    this.usuarioService.obtenerUsuario().subscribe(
      (result) => {
        var usu: Usuario = new Usuario();
        result.forEach(element => {
          Object.assign(usu, element);
          this.usuarios.push(usu);
          console.log(this.usuarios.toString())
          usu = new Usuario();
        });
      },
      (error) => {
        console.log(error);
        this.mensajeFallaError(error);
      }
    );
  }

  public borrarAfiliado(afi: Afiliado) {
    this.cargarUsuarios();
    this.afiliadoService.deleteAfiliado(afi).subscribe(
      (result) => {
        this.bajaUsuario(afi);
        console.log("afi borrarAfiliado:" + afi.email);
        this.mensajeExitoEliminado();
        afi = new Afiliado();
        this.cargarTabla();
      },
      (error) => {
        console.log(error);
        this.mensajeFallaError(error);
      }
    );
  }
  public bajaUsuario(afi: Afiliado) {
    var bandera: boolean;
    bandera=false;
    console.log("afi bajaUsuario:" + afi.email);
    for (var i = 0; i < this.usuarios.length; i++) {
      if (afi.email == this.usuarios[i].usuarioEmail) {
        console.log(this.usuarios[i]);
        bandera=true;
        this.usuarioEliminado = this.usuarios[i];
      }
    }
    if(bandera==true){
    this.usuarioEliminado.activo = false;
    console.log(this.usuarioEliminado.usuarioEmail);
    this.usuarioService.updateUsuario(this.usuarioEliminado).subscribe(
      (result) => {
        this.mensajeExitoEliminadoUsuario();
        this.usuarioEliminado = new Usuario();
      },
      (error) => {
        console.log(error);
        this.mensajeFallaError(error);
      }
    );
  }
  }

  public cargarEmails() {
    var email: string;
    this.afiliadoService.obtenerAfiliado().subscribe(
      (result) => {
        var afi: Afiliado = new Afiliado();
        result.forEach(element => {
          Object.assign(afi, element);
          this.emails.push(afi.email);
          console.log(this.emails.toString())
          afi = new Afiliado();
        });
      },
      (error) => {
        console.log(error);
        this.mensajeFallaError(error);
      }
    );

  }

  public modificarAfiliado() {
    this.afiliadoService.updateAfiliado(this.afiliadoSeleccionado).subscribe(
      (result) => {
        this.mensajeExitoModificado();
        this.afiliadoSeleccionado = new Afiliado();
        this.cargarTabla();
      },
      (error) => {
        console.log(error);
        this.mensajeFallaError(error);
      }
    );
  }

  public verificarAfiliado() {

    this.band = false;

    for (var i = 0; i < this.emails.length; i++) {
      if (this.afiliado.email == this.emails[i]) {
        this.band = true;
      }
    }

  }
  public onFileChanges(files) {
    if(files!=null){
      this.afiliado.imagen = files[0].base64;
    }
  }
  public onFileChanges2(files) {
    if(files!=null){
      this.afiliadoSeleccionado.imagen = files[0].base64;
    }
  }

  public cargarTabla() {
    this.afiliados = new Array<Afiliado>();
    this.afiliadoService.obtenerAfiliado().subscribe(
      (result) => {
        var afi: Afiliado = new Afiliado();
        result.forEach(element => {
          Object.assign(afi, element);
          this.afiliados.push(afi);
          afi = new Afiliado();
        });
      },
      (error) => {
        console.log(error);
        this.mensajeFallaError(error);
      }
    )
  }
}
