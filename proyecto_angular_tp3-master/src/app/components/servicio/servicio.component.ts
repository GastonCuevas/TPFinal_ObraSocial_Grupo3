import { Component, OnInit } from '@angular/core';
import { Afiliado } from 'src/app/models/afiliado';
import { AfiliadoService } from 'src/app/services/afiliado.service';
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
  servicioSeleccionado = new Servicio();
  afiliado: Afiliado;
  afiliados: Array<Afiliado>;
  afiliadosInscriptos: Array<Afiliado>;
  usuario: Usuario;

  constructor(private servicioService: ServicioService, public usuarioService: UsuarioService, private afiliadoService: AfiliadoService, private _toastr: ToastrService) {

    this.servicios = new Array<Servicio>();
    this.servicio = new Servicio();
    this.afiliado = new Afiliado();
    this.afiliados = new Array<Afiliado>();
    this.afiliadosInscriptos = new Array<Afiliado>();
    this.servicioSeleccionado = new Servicio();
    this.cargarServicios();
    this.cargarTabla();
  }

  ngOnInit(): void {
  }

  mensajeExitoCarga() {
    this._toastr.success("El servicio ha sido cargado correctamente", "Exito");
  }
  mensajeExitoModificado() {
    this._toastr.success("El servicio ha sido modificado correctamente", "Exito");
  }
  mensajeExitoEliminado() {
    this._toastr.success("El servicio ya no está activo", "Exito");
  }
  mensajeExitoActivado() {
    this._toastr.success("El servicio está activo", "Exito");
  }
  mensajeExitoSuscripcion() {
    this._toastr.success("¡Te suscribiste a este servicio!", "Exito");
  }
  mensajeFallaError(mensaje) {
    this._toastr.warning(mensaje);
  }
  mensajeFallaErrorSuscripcion() {
    this._toastr.warning("Usted ya se ha suscrito a este servicio");
  }

  public onFileChanges(files) {
    if (files != null) {
      this.servicio.imagen = files[0].base64;
    }
  }
  public onFileChanges2(files) {
    if (files != null) {
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
          ser = new Servicio();
        });
      },
      (error) => {
        this.mensajeFallaError(error);
      }
    )
  }
  public seleccionarServicio(ser: Servicio) {
    this.servicioSeleccionado = ser;
  }


  public crearServicio() {
    this.servicio.activo = true;
    this.servicioService.agregarServicio(this.servicio).subscribe(
      (result) => {
        this.cargarServicios();
        this.mensajeExitoCarga();
        this.servicio = new Servicio();
      },
      (error) => {
        this.mensajeFallaError(error);
      }
    )
  }

  public modificarServicio() {
    this.servicioService.updateServicio(this.servicioSeleccionado).subscribe(
      (result) => {
        this.mensajeExitoModificado();
        this.servicioSeleccionado = new Servicio();
        this.cargarServicios();
      },
      (error) => {
        this.mensajeFallaError(error);
      }
    );
  }


  public borrarServicio(ser: Servicio) {
    ser.activo = false;

    this.servicioService.updateServicio(ser).subscribe(
      (result) => {
        this.mensajeExitoEliminado();
        ser = new Servicio();
        this.cargarServicios();
      },
      (error) => {
        this.mensajeFallaError(error);
      }
    );
  }
  public activarServicio(ser: Servicio) {
    ser.activo = true;

    this.servicioService.updateServicio(ser).subscribe(
      (result) => {
        this.mensajeExitoActivado();
        ser = new Servicio();
        this.cargarServicios();
      },
      (error) => {
        this.mensajeFallaError(error);
      }
    );
  }

  public verServicio(ser: Servicio) {
    this.servicioSeleccionado = ser;
    this.cargarAfiliados();
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
        this.mensajeFallaError(error);
      }
    )
  }

  public cargarAfiliados() {

    this.afiliadosInscriptos = new Array<Afiliado>();

    for (var i = 0; i < this.servicioSeleccionado.afiliadosInsc.length; i++) {
      for (var j = 0; j < this.afiliados.length; j++) {
        if (this.servicioSeleccionado.afiliadosInsc[i]._id == this.afiliados[j]._id) {
          this.afiliadosInscriptos.push(this.afiliados[j]);
        }
      }
    }
  }

  public suscribirServicio(ser: Servicio) {

    var band: boolean = false;
    var afi: Afiliado = new Afiliado();

    for (var i = 0; i < ser.afiliadosInsc.length; i++) {
      
      for(var j = 0; j < this.afiliados.length; j++){
        if(this.afiliados[j]._id == ser.afiliadosInsc[i]._id){
          this.afiliado = this.afiliados[j];
        }
      }
      if (this.afiliado.email == this.usuarioService.userLogged.usuarioEmail) {
        band = true;
      }
      this.afiliado = new Afiliado();
    }

    if (band == true) {
      this.mensajeFallaErrorSuscripcion();
    } else {

      for (var i = 0; i < this.afiliados.length; i++) {
        if (this.afiliados[i].email == this.usuarioService.userLogged.usuarioEmail) {
          afi = this.afiliados[i];
        }
      }

      ser.afiliadosInsc.push(afi);
      this.servicioService.updateServicio(ser).subscribe(
        (result) => {
          this.mensajeExitoSuscripcion();
          ser = new Servicio();
          this.cargarServicios();
        },
        (error) => {
          this.mensajeFallaError(error);
        }
      );
    }

  }


}
