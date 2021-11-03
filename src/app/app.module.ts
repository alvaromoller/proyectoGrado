import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material/material.module';
import {FlexLayoutModule} from "@angular/flex-layout";


//Rutas
import { APP_ROUTING } from './app.routes';


//Servicios
import { TiendasService } from './servicios/tiendas.service';


//Componentes
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { TiendasComponent } from './components/tiendas/tiendas.component';
import { EncuestaComponent } from './components/encuesta/encuesta.component';
import { ListTiendasComponent } from './components/tiendas/list-tiendas/list-tiendas.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    TiendasComponent,
    EncuestaComponent,
    ListTiendasComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    APP_ROUTING
  ],
  providers: 
  [
    TiendasService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
