import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Afiliado } from 'src/app/models/afiliado';

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

  mostrarPassword: boolean = true;
  mostrarSelect: boolean = false;

  constructor(private usuarioService: UsuarioService) { 
    this.usuario = new Usuario();
    this.usuarioSeleccionado = new Usuario();
    this.usuarios = new Array<Usuario>();
    this.cargarTabla();
  }

  public crearUsuario(){

    this.usuario.activo = true;

    this.usuarioService.agregarUsuario(this.usuario).subscribe(
      (result)=>{
        alert("Usuario guardado");
        this.cargarTabla();
        this.usuario = new Usuario();
      },
      (error)=>{
        console.log(error);
      }
    )
  }

  public seleccionarUsuario(usu: Usuario){
    this.usuarioSeleccionado = usu;
  }

  public borrarUsuario(usu: Usuario){
    usu.activo = false;

    this.usuarioService.updateUsuario(usu).subscribe(
      (result)=>{
        alert("Usuario inactivado");
        usu = new Usuario();
        this.cargarTabla();
      },
      (error)=>{
        console.log(error);
      }
    );
  }

  public modificarUsuario(){
    this.usuarioService.updateUsuario(this.usuarioSeleccionado).subscribe(
      (result)=>{
        alert("Usuario actualizado");
        this.usuarioSeleccionado = new Usuario();
        this.cargarTabla();
      },
      (error)=>{
        console.log(error);
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
      }
    );
  }

  public cargarEmailSelect() {
    this.emails = new Array<string>();
    this.cargarEmails();
    // Ordena el Array Alfabeticamente, es muy facil ;)):
    this.emails.sort();
    this.addOptions("emailSelect", this.emails);
   }
   
   // Rutina para agregar opciones a un <select>
   public addOptions(domElement, array) {
    var select = document.getElementsByName(domElement)[0];
    console.log(array)
    for(var i in array)
            { 
              console.log(1);
                document.getElementById("emailId").innerHTML += "<option value='"+array[i]+"'>"+array[i]+"</option>";
            }
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
      }
    )
  }

  ngOnInit(): void {
  }

}
