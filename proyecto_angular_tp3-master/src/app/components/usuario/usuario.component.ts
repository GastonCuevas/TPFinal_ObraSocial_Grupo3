import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Afiliado } from 'src/app/models/afiliado';
import { ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  usuario: Usuario;
  usuarioSeleccionado: Usuario;

  usuarios: Array<Usuario>;
  emails: Array<string> = [];
  emailsUsuarios: Array<string> = [];
  band: Boolean = false;

  mostrarPassword: boolean = true;
  mostrarSelect: boolean = false;

  constructor(public usuarioService: UsuarioService, private _toastr:ToastrService) { 
    this.usuario = new Usuario();
    this.usuarioSeleccionado = new Usuario();
    this.usuarios = new Array<Usuario>();
    this.cargarTabla();
    this.cargarEmails();
    this.cargarUsuarios();
  }

  mensajeExitoCarga(){
    this._toastr.success("El usuario ha sido cargado correctamente", "Exito");
  }
  mensajeExitoActivado(){
    this._toastr.success("El usuario ha sido activado correctamente", "Exito");
  }
  mensajeExitoModificado(){
    this._toastr.success("El usuario ha sido modificado correctamente", "Exito");
  }
  mensajeExitoEliminado(){
    this._toastr.success("El usuario ha sido eliminado correctamente", "Exito");
  }
  mensajeFallaEmailRepetido(){
    this._toastr.error("Este e-mail ya está registrado", "Falla");
  }
  mensajeFallaError(mensaje){
    this._toastr.warning(mensaje);
  }



  public crearUsuario(){

    this.usuario.activo = true;
    this.verificarUsuario();

    if(this.band==false){
      this.usuarioService.agregarUsuario(this.usuario).subscribe(
        (result)=>{
          this.mensajeExitoCarga();
          this.cargarTabla();
          this.usuario = new Usuario();
        },
        (error)=>{
          console.log(error);
          this.mensajeFallaError(error);
        }
      )
    }else{
      this.mensajeFallaEmailRepetido();
    }

    
  }

  public seleccionarUsuario(usu: Usuario){
    this.usuarioSeleccionado = usu;
  }

  public borrarUsuario(usu: Usuario){
    usu.activo = false;

    this.usuarioService.updateUsuario(usu).subscribe(
      (result)=>{
        this.mensajeExitoEliminado();
        usu = new Usuario();
        this.cargarTabla();
      },
      (error)=>{
        console.log(error);
        this.mensajeFallaError(error);
      }
    );
  }
  public activarUsuario(usu: Usuario){
    usu.activo = true;

    this.usuarioService.updateUsuario(usu).subscribe(
      (result)=>{
        this.mensajeExitoActivado();
        usu = new Usuario();
        this.cargarTabla();
      },
      (error)=>{
        console.log(error);
        this.mensajeFallaError(error);
      }
    );
  }

  public modificarUsuario(){
    this.usuarioService.updateUsuario(this.usuarioSeleccionado).subscribe(
      (result)=>{
        this.mensajeExitoModificado();
        this.usuarioSeleccionado = new Usuario();
        this.cargarTabla();
      },
      (error)=>{
        console.log(error);
        this.mensajeFallaError(error);
      }
    );
  }

  public cargarEmails(){
    var email: string;
    this.usuarioService.obtenerAfiliados().subscribe(
      (result)=>{
        var afi: Afiliado = new Afiliado();
        result.forEach(element => {
          Object.assign(afi, element);
          this.emails.push(afi.email);
          console.log(this.emails.toString())
          afi = new Afiliado();
        });
      },
      (error)=>{
        console.log(error);
        this.mensajeFallaError(error);
      }
    );
  }

  public verificarUsuario(){

    this.band = false;

    this.cargarUsuarios();

      for(var i = 0; i<this.emailsUsuarios.length; i++){
        if(this.usuario.usuarioEmail == this.emailsUsuarios[i]){
            this.band = true;
        }
      }

  }


  public cargarUsuarios(){
    this.usuarioService.obtenerUsuario().subscribe(
      (result)=>{
        var usu: Usuario = new Usuario();
        result.forEach(element => {
          Object.assign(usu, element);
          this.emailsUsuarios.push(usu.usuarioEmail);
          console.log(this.emailsUsuarios.toString())
          usu = new Usuario();
        });
      },
      (error)=>{
        console.log(error);
        this.mensajeFallaError(error);
      }
    );
  }

  public seleccionPerfil(){
    if(this.usuario.perfil == "afiliado"){
      this.mostrarPassword = false;
      this.mostrarSelect = true;
    }else{
      this.mostrarPassword = true;
      this.mostrarSelect = false;
    }
  }

  public cargarTabla(){
    this.usuarios = new Array<Usuario>();
    this.usuarioService.obtenerUsuario().subscribe(
      (result)=>{
        var usu: Usuario = new Usuario();
        result.forEach(element => {
          Object.assign(usu, element);
          this.usuarios.push(usu);
          usu = new Usuario();
        });
      },
      (error)=>{
        console.log(error);
        this.mensajeFallaError(error);
      }
    )
  }

  

  ngOnInit(): void {
  }

}
