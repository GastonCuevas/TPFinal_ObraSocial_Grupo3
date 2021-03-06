import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxDataTableModule} from "angular-9-datatable";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { AbouthUsComponent } from './components/abouth-us/abouth-us.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { AfiliadoComponent } from './components/afiliado/afiliado.component';
import { AlifeFileToBase64Module } from 'alife-file-to-base64';
import { UsuarioService } from './services/usuario.service';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NoticiaComponent } from './components/noticia/noticia.component';
import { NovedadComponent } from './components/novedad/novedad.component';
import { ServicioComponent } from './components/servicio/servicio.component';
import { PagoComponent } from './components/pago/pago.component';
import {NgxPrintModule} from 'ngx-print';

import { FacebookModule } from 'ngx-fb';
 
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    FooterComponent,
    AbouthUsComponent,
    UsuarioComponent,
    AfiliadoComponent,
    NoticiaComponent,
    NovedadComponent,
    ServicioComponent,
    PagoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDataTableModule,
    HttpClientModule,
    AlifeFileToBase64Module,
    BrowserAnimationsModule,
    NgxPrintModule,
    FacebookModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 3000,
      preventDuplicates: true,
    }),
  ],
  providers: [UsuarioService],
  bootstrap: [AppComponent]
})
export class AppModule { }