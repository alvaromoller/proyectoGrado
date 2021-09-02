import { RouterModule,Routes} from '@angular/router';
import { NgModule } from '@angular/core';

import { HomeComponent } from './components/home/home.component';
import { TiendasComponent } from './components/tiendas/tiendas.component';
import { EncuestaComponent } from './components/encuesta/encuesta.component';



const APP_ROUTES: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'tiendas', component: TiendasComponent },
    { path: 'encuesta', component: EncuestaComponent },
    //{ path: 'path4', component: Name4Component } ,
    { path: '**', pathMatch:'full', redirectTo:'home' }
];


//{useHash:true}
//añadirá un # a la ruta, truco de los navegadores para evitar que el navegador recargue la pagina.
export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES, {useHash:true} );

