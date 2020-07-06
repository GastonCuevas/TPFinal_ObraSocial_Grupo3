import { Component, OnInit } from '@angular/core';
import { Afiliado } from 'src/app/models/afiliado';
import { AfiliadoService} from 'src/app/services/afiliado.service';
import { Pago } from 'src/app/models/pago';
import { PagoService } from 'src/app/services/pago.service';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css']
})
export class PagoComponent implements OnInit {
  emails: Array<string> = [];
  ticketInfo: Array<string> = [];
  pago: Pago;
  pagos: Array<Pago>;
  pagoSeleccionado= new Pago();
  afiliado: Afiliado;
  afiliados: Array<Afiliado>;
  usuario: Usuario;
  emailAfiliado: string;
  pago2: Pago;
  fechapago: Date;
  constructor(private pagoService: PagoService, public usuarioService: UsuarioService, private afiliadoService: AfiliadoService, private _toastr: ToastrService) {
    this.pagos= new Array<Pago>();
    this.pago= new Pago();
    this.afiliado = new Afiliado();
    this.afiliados= new Array<Afiliado>();
    this.pagoSeleccionado = new Pago();
    this.pago2=new Pago();
    this.fechapago = new Date();
    this.cargarPagos();
    this.cargarTabla();
    this.cargarAfiliados();
  }

  ngOnInit(): void {
  }

  mensajeExitoCarga(){
    this._toastr.success("El pago ha sido cargado correctamente", "Exito");
  }
  mensajeExitoModificado(){
    this._toastr.success("El pago ha sido modificado correctamente", "Exito");
  }

  mensajeFallaError(mensaje){
    this._toastr.warning(mensaje);
  }

  public asignarAfiliado(){
    
  }

  public cargarPagos() {
    this.pagos = new Array<Pago>();
    this.pagoService.obtenerPago().subscribe(
      (result) => {
        var pag: Pago = new Pago();
        result.forEach(element => {
          Object.assign(pag, element);
          this.pagos.push(pag);
          console.log(pag);
          pag = new Pago();
        });
      },
      (error) => {
        console.log(error);
        this.mensajeFallaError(error);
      }
    )
  }
  public seleccionarPago(pag: Pago){
    this.pagoSeleccionado = pag;
  }

  public crearPago2(){
    this.pago2.fecha = new Date();
    this.pago2.anio= this.pago2.fecha.getUTCFullYear();
    this.pago2.mes= this.pago2.fecha.getUTCMonth();
    this.pago2.afiliado=this.afiliados.find((item:Afiliado)=>item.email==this.emailAfiliado);
    this.pagoService.agregarPago(this.pago2).subscribe(
      (result) => {
        this.cargarPagos();
        this.mensajeExitoCarga();
        this.pago2 = new Pago();
      },
      (error) => {
        console.log(error);
      }
    )
  }

  public crearPago() {
    var auxdate = new Date(this.pago.fecha);
    this.pago.anio= auxdate.getFullYear();
    this.pago.mes= auxdate.getMonth()+1;
    this.pago.afiliado=this.afiliados.find((item:Afiliado)=>item.email==this.emailAfiliado);
    this.pagoService.agregarPago(this.pago).subscribe(
      (result) => {
        this.cargarPagos();
        this.mensajeExitoCarga();
        this.pago = new Pago();
      },
      (error) => {
        console.log(error);
      }
    )
  }

  public mostrarData(){
    console.log("entró mostrardata");
    var auxdate = new Date(this.pago.fecha);
    this.pago.anio= auxdate.getFullYear();
    this.pago.mes= auxdate.getMonth()+1;
    this.pago.afiliado=this.afiliados.find((item:Afiliado)=>item.email==this.emailAfiliado);
    this.ticketInfo[0]=this.pago.afiliado.email;
    this.ticketInfo[1]=this.pago.afiliado.apellido;
    this.ticketInfo[2]=this.pago.afiliado.nombres;
    this.ticketInfo[3]=this.pago.afiliado.dni.toString();
    console.log(this.pago.fecha);
    console.log(this.pago.anio);
    console.log(this.pago.mes);
    console.log(this.pago.afiliado.email);
    console.log(this.pago.afiliado.nombres);
    console.log(this.pago.afiliado.apellido);
    console.log(this.ticketInfo);
    console.log(this.ticketInfo[0]);
    console.log(this.ticketInfo[1]);
    console.log(this.ticketInfo[2]);
  }

  public modificarPago(){
    this.pagoService.updatePago(this.pagoSeleccionado).subscribe(
      (result)=>{
        this.mensajeExitoModificado();
        this.pagoSeleccionado = new Pago();
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
  public cargarAfiliados(){
    var email: string;
    this.afiliadoService.obtenerAfiliado().subscribe(
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
      }
    )
  }
}
