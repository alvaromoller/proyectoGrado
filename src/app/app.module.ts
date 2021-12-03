import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material/material.module';
import {FlexLayoutModule} from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


//http para realizar GET, POST,PUT, DELETE
import {HttpClient, HttpClientModule} from "@angular/common/http";



//Rutas
import { APP_ROUTING } from './app.routes';


//Servicios
import { TiendasService } from './servicios/tiendas.service';
import { ProductosService } from './servicios/productos.service';


//Componentes
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { TiendasComponent } from './components/tiendas/tiendas.component';
import { EncuestaComponent } from './components/encuesta/encuesta.component';
import { ListTiendasComponent } from './components/tiendas/list-tiendas/list-tiendas.component';
import { ProductosComponent } from './components/productos/productos.component';
import { ListProductosComponent } from './components/productos/list-productos/list-productos.component';
import { VentanaEmergenteTiendasComponent } from './components/tiendas/ventana-emergente-tiendas/ventana-emergente-tiendas.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    TiendasComponent,
    EncuestaComponent,
    ListTiendasComponent,
    ProductosComponent,
    ListProductosComponent,
    VentanaEmergenteTiendasComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    APP_ROUTING
  ],
  providers: 
  [
    TiendasService,
    ProductosService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
