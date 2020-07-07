import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-abouth-us',
  templateUrl: './abouth-us.component.html',
  styleUrls: ['./abouth-us.component.css']
})
export class AbouthUsComponent implements OnInit {

  mostrarsobrenosotros: boolean=true;
  mostrarcontactenos: boolean=false;
  mostrardelegaciones: boolean=false;
  mostrarbeneficiarios: boolean=false;

  constructor() { }

  public verSobrenosotros(){
    this.mostrarsobrenosotros=true;
    this.mostrarcontactenos=false;
    this.mostrardelegaciones=false;
    this.mostrarbeneficiarios=false;
  }
  public verContactenos(){
    this.mostrarsobrenosotros=false;
    this.mostrarcontactenos=true;
    this.mostrardelegaciones=false;
    this.mostrarbeneficiarios=false;
  }
  public verDelegaciones(){
    this.mostrarsobrenosotros=false;
    this.mostrarcontactenos=false;
    this.mostrardelegaciones=true;
    this.mostrarbeneficiarios=false;
  }
  public verBeneficiarios(){
    this.mostrarsobrenosotros=false;
    this.mostrarcontactenos=false;
    this.mostrardelegaciones=false;
    this.mostrarbeneficiarios=true;
  }

  ngOnInit(): void {
  }

}
