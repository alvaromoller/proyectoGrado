import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from "rxjs";
import { ProductosTienda } from '../../app/components/productos/productosTienda';
import { Productos } from '../../app/components/productos/productos';

@Injectable({
    providedIn: 'root'
})
export class ProductosTiendaService {

    private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    
    constructor(private http:HttpClient) { }

    ShopUrl:string = 'http://localhost:8080/v1/shop';

    //conexión con el backend, 
    //lista de tiendas    
    getShops(): Observable<ProductosTienda[]>{
        return this.http.get<ProductosTienda[]>(this.ShopUrl);
    }

    //Encontrar producto por ID
    getShopId(id:any):Observable<any>{
        return this.http.get<ProductosTienda[]>(this.ShopUrl + "/" + id);
    }

    //obtiene el detalle de la tienda
    last:any;
    setLast(tienda: ProductosTienda){
      this.last = tienda;
    }
    getLast(): ProductosTienda{
        return this.last;
    }


    


}