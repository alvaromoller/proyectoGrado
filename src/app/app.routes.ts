import { RouterModule,Routes} from '@angular/router';
import { NgModule } from '@angular/core';

import { HomeComponent } from './components/home/home.component';
import { EncuestaComponent } from './components/encuesta/encuesta.component';
import { TiendasComponent } from './components/tiendas/tiendas.component';
import { ListTiendasComponent } from './components/tiendas/list-tiendas/list-tiendas.component';
import { VentanaEmergenteTiendasComponent } from './components/tiendas/ventana-emergente-tiendas/ventana-emergente-tiendas.component';
import { ListProductosComponent } from './components/productos/list-productos/list-productos.component';
import { ProductosComponent } from './components/productos/productos.component';



const APP_ROUTES: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'encuesta', component: EncuestaComponent },
    { path: 'tienda/:id', component: TiendasComponent },
    { path: 'listaTiendas', component: ListTiendasComponent },
    { path: 'listaProductos', component: ListProductosComponent },
    { path: 'producto/:id/:tiendaId/:marcaId/:tipoProductoId', component: ProductosComponent },   //get ID
    //{ path: 'path4', component: Name4Component } ,
    { path: '**', pathMatch:'full', redirectTo:'home' }
];


//{useHash:true}
//añadirá un # a la ruta, truco de los navegadores para evitar que el navegador recargue la pagina.
export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES, {useHash:true} );

