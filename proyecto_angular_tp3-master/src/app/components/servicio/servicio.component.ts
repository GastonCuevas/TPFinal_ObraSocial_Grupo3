import { Component, OnInit } from '@angular/core';
import { Afiliado } from 'src/app/models/afiliado';
import { AfiliadoService} from 'src/app/services/afiliado.service';
import { Servicio } from 'src/app/models/servicio';
import { ServicioService } from 'src/app/services/servicio.service';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-servicio',
  templateUrl: './servicio.component.html',
  styleUrls: ['./servicio.component.css']
})
export class ServicioComponent implements OnInit {
  servicio: Servicio;
  servicios: Array<Servicio>;
  servicioSeleccionado= new Servicio();
  afiliado: Afiliado;
  afiliados: Array<Afiliado>;
  usuario: Usuario;

  constructor(private servicioService: ServicioService, public usuarioService: UsuarioService, private afiliadoService: AfiliadoService, private _toastr: ToastrService) {

    this.servicios= new Array<Servicio>();
    this.servicio= new Servicio();
    this.afiliado = new Afiliado();
    this.afiliados= new Array<Afiliado>();
    this.servicioSeleccionado = new Servicio();
    this.cargarServicios();
    this.cargarTabla();
   }

  ngOnInit(): void {
  }

  mensajeExitoCarga(){
    this._toastr.success("La noticia ha sido cargada correctamente", "Exito");
  }
  mensajeExitoModificado(){
    this._toastr.success("La noticia ha sido modificada correctamente", "Exito");
  }
  mensajeExitoEliminado(){
    this._toastr.success("La noticia ya no está vigente", "Exito");
  }
  mensajeExitoActivado(){
    this._toastr.success("La noticia está vigente", "Exito");
  }
  mensajeFallaError(mensaje){
    this._toastr.warning(mensaje);
  }

  public onFileChanges(files) {
    if(files!=null){
      this.servicio.imagen = files[0].base64;
    }
  }
  public onFileChanges2(files) {
    if(files!=null){
      this.servicioSeleccionado.imagen = files[0].base64;
    }
  }

  public cargarServicios() {
    this.servicios = new Array<Servicio>();
    this.servicioService.obtenerServicio().subscribe(
      (result) => {
        var ser: Servicio = new Servicio();
        result.forEach(element => {
          Object.assign(ser, element);
          this.servicios.push(ser);
          console.log(ser);
          console.log(ser.afiliadosInsc);
          ser = new Servicio();
        });
      },
      (error) => {
        console.log(error);
        this.mensajeFallaError(error);
      }
    )
  }
  public seleccionarServicio(ser: Servicio){
    this.servicioSeleccionado = ser;
  }


  public crearServicio() {
    this.servicio.activo=true;
    this.servicioService.agregarServicio(this.servicio).subscribe(
      (result) => {
        this.cargarServicios();
        this.mensajeExitoCarga();
        this.servicio = new Servicio();
      },
      (error) => {
        console.log(error);
      }
    )
  }

  public modificarServicio(){
    this.servicioService.updateServicio(this.servicioSeleccionado).subscribe(
      (result)=>{
        this.mensajeExitoModificado();
        this.servicioSeleccionado = new Servicio();
        this.cargarTabla();
      },
      (error)=>{
        console.log(error);
        this.mensajeFallaError(error);
      }
    );
  }


  public borrarServicio(ser: Servicio){
    ser.activo = false;

    this.servicioService.updateServicio(ser).subscribe(
      (result)=>{
        this.mensajeExitoEliminado();
        ser = new Servicio();
        this.cargarTabla();
      },
      (error)=>{
        console.log(error);
        this.mensajeFallaError(error);
      }
    );
  }
  public activarServicio(ser: Servicio){
    ser.activo = true;

    this.servicioService.updateServicio(ser).subscribe(
      (result)=>{
        this.mensajeExitoActivado();
        ser = new Servicio();
        this.cargarTabla();
      },
      (error)=>{
        console.log(error);
        this.mensajeFallaError(error);
      }
    );
  }


  public cargarTabla(){
    this.afiliados = new Array<Afiliado>();
    this.afiliadoService.obtenerAfiliado().subscribe(
      (result)=>{
        var afi: Afiliado = new Afiliado();
        result.forEach(element => {
          Object.assign(afi, element);
          this.afiliados.push(afi);
          afi = new Afiliado();
        });
      },
      (error)=>{
        console.log(error);
      }
    )
  }


}
