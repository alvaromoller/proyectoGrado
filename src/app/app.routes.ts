import { RouterModule,Routes} from '@angular/router';
import { NgModule } from '@angular/core';

import { HomeComponent } from './components/home/home.component';
import { EncuestaComponent } from './components/encuesta/encuesta.component';
import { TiendasComponent } from './components/tiendas/tiendas.component';
import { ListTiendasComponent } from './components/tiendas/list-tiendas/list-tiendas.component';
import { homeShopComponent } from './components/tiendas/homeShop/homeShop.component';
import { ListProductosComponent } from './components/productos/list-productos/list-productos.component';
import { ProductosComponent } from './components/productos/productos.component';



const APP_ROUTES: Routes = [
    { path: 'home', component: HomeComponent },   
    { path: 'listaProductos', component: ListProductosComponent },
    { path: 'producto/:id/:tiendaId/:marcaId/:tipoProductoId', component: ProductosComponent },   //get ID
    

    { path: 'encuesta', component: EncuestaComponent },
    //Mejorar tiendas
    { path: 'tiendas', component: homeShopComponent },                  //lista de tiendas
    { path: 'listaProductosTienda/:tiendaId', component: ListTiendasComponent }, //lista de productos desde tienda
    { path: 'productoTienda', component: TiendasComponent },       //producto individual desde tienda

    //{ path: 'path4', component: Name4Component } ,
    { path: '**', pathMatch:'full', redirectTo:'home' }
];


//{useHash:true}
//añadirá un # a la ruta, truco de los navegadores para evitar que el navegador recargue la pagina.
export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES, {useHash:true} );

