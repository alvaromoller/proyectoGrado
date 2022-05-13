import { RouterModule,Routes} from '@angular/router';
import { NgModule } from '@angular/core';

import { HomeComponent } from './components/home/home.component';
import { EncuestaComponent } from './components/encuesta/encuesta.component';
import { TiendasComponent } from './components/tiendas/tiendas.component';
import { ListTiendasComponent } from './components/tiendas/list-tiendas/list-tiendas.component';
import { ProductsByStoreComponent } from './components/tiendas/products-by-store/products-by-store.component';

import { homeShopComponent } from './components/tiendas/homeShop/homeShop.component';
import { ListProductosComponent } from './components/productos/list-productos/list-productos.component';
import { ProductosComponent } from './components/productos/productos.component';
import { CategoriasComponent } from './components/categorias/categorias.component';
import { ListCategoriasComponent } from './components/categorias/list-categorias/list-categorias.component';

import { CarritoComponent } from './components/carrito/carrito.component';
import { WebSocketComponent } from './components/webSocket/web-socket/web-socket.component';




const APP_ROUTES: Routes = [
    { path: 'home', component: HomeComponent },   
    { path: 'listaProductos', component: ListProductosComponent },
    { path: 'producto/:id/:tiendaId', component: ProductosComponent },   //get ID
    
    //recomendaciones por categorias
    { path: 'listaCategorias', component: ListCategoriasComponent },
    { path: 'categoria/:categoryId', component: CategoriasComponent },   //get ID
    
    //encuesta
    { path: 'encuesta', component: EncuestaComponent },

    //Mejorar tiendas
    { path: 'tiendas', component: homeShopComponent },                  //lista de tiendas
    //{ path: 'productoPorTienda', component: ProductsByStoreComponent },   //lista de productos, probando el html 
    { path: 'productoPorTienda/:storeId', component: ProductsByStoreComponent },   //lista de productos por tienda, get tiendaId
    //{ path: 'productoTienda', component: TiendasComponent },       //producto individual desde tienda

    //Carrito
    { path: 'carrito', component: CarritoComponent },

    //Probando webSocket
    { path: 'webSocket', component: WebSocketComponent },

    //{ path: 'path4', component: Name4Component } ,
    { path: '**', pathMatch:'full', redirectTo:'home' }
];


//{useHash:true}
//añadirá un # a la ruta, truco de los navegadores para evitar que el navegador recargue la pagina.
export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES, {useHash:true} );

