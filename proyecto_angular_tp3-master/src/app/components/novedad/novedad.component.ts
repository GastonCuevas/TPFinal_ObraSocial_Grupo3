import { Component, OnInit } from '@angular/core';
import { Novedad } from 'src/app/models/novedad';
import { NovedadService } from 'src/app/services/novedad.service';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-novedad',
  templateUrl: './novedad.component.html',
  styleUrls: ['./novedad.component.css']
})
export class NovedadComponent implements OnInit {
  novedad: Novedad;
  novedades: Array<Novedad>;
  novedadesAfiliado:Array<Novedad>;
  usuario: Usuario;
  usuarios: Array<Usuario>;
  novedadSeleccionada = new Novedad();
  respuesta: string;
  constructor(public novedadService: NovedadService, private _toastr: ToastrService, public usuarioService: UsuarioService) { 
    this.novedades = new Array<Novedad>();
    this.novedadesAfiliado=new Array<Novedad>();
    this.novedad = new Novedad();
    this.usuarios= new Array<Usuario>();
    this.usuario= new Usuario();
    this.novedadSeleccionada = new Novedad();
    this.cargarNovedadAfiliado();
    this.cargarNovedad();
    this.cargarTabla();
  }

  ngOnInit(): void {
  }

  mensajeExitoCarga(){
    this._toastr.success("La novedad ha sido enviada correctamente", "Exito");
  }
  mensajeExitoModificado(){
    this._toastr.success("La novedad ha sido contestada correctamente y ha sido procesada", "Exito");
  }
  mensajeFallaError(mensaje){
    this._toastr.warning(mensaje);
  }

  public cargarNovedadAfiliado() {
    this.novedadesAfiliado = new Array<Novedad>();
    this.novedadService.obtenerNovedad().subscribe(
      (result) => {
        var nov: Novedad = new Novedad();
        result.forEach(element => {
          Object.assign(nov, element);
          if(nov.usuario.usuarioEmail==this.usuarioService.userLogged.usuarioEmail){
            console.log(nov.usuario.usuarioEmail+" y "+this.usuarioService.userLogged.usuarioEmail);
            this.novedadesAfiliado.push(nov);
          }
          console.log(nov);
          console.log(nov.usuario.usuarioEmail);
          nov = new Novedad();
        });
      },
      (error) => {
        console.log(error);
        this.mensajeFallaError(error);
      }
    )
  }

  public cargarNovedad() {
    this.novedades = new Array<Novedad>();
    this.novedadService.obtenerNovedad().subscribe(
      (result) => {
        var nov: Novedad = new Novedad();
        result.forEach(element => {
          Object.assign(nov, element);
          this.novedades.push(nov);
          console.log(nov);
          console.log(nov.usuario.usuarioEmail);
          nov = new Novedad();
        });
      },
      (error) => {
        console.log(error);
        this.mensajeFallaError(error);
      }
    )
  }

  public crearNovedad() {
    console.log(this.usuarioService.userLogged)
    this.novedad.estado="pendiente";
    this.novedad.respuesta="Aún no respondida";
    this.novedad.usuario=this.usuarios.find((item:Usuario)=>item.usuarioEmail==this.usuarioService.userLogged.usuarioEmail);
    this.novedadService.agregarNovedad(this.novedad).subscribe(
      (result) => {
        this.cargarNovedadAfiliado();
        this.mensajeExitoCarga();
        this.novedad = new Novedad();
      },
      (error) => {
        console.log(error);
      }
    )
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
      }
    )
  }

  public seleccionarNovedad(nov: Novedad){
    this.novedadSeleccionada = nov;
  }

  public modificarNovedad(){
    this.novedadSeleccionada.estado="procesado";
    this.novedadSeleccionada.respuesta= this.respuesta;
    this.novedadService.updateNovedad(this.novedadSeleccionada).subscribe(
      (result)=>{
        this.mensajeExitoModificado();
        this.novedadSeleccionada = new Novedad();
        this.cargarTabla();
      },
      (error)=>{
        console.log(error);
        this.mensajeFallaError(error);
      }
    );
  }

}
