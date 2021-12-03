import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from "rxjs";
import { ProductosTienda } from '../../app/components/productos/productosTienda';

@Injectable({
    providedIn: 'root'
})
export class ProductosTiendaService {

    private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    
    constructor(private http:HttpClient) { }

    ShopUrl:string = 'http://localhost:8080/v1/shop';

    //conexión con el backend, 
    //lista de tiendas    
    getShop(): Observable<ProductosTienda[]>{
        return this.http.get<ProductosTienda[]>(this.ShopUrl);
    }

    //Encontrar producto por ID
    getShopId(id:any):Observable<any>{
        return this.http.get<ProductosTienda[]>(this.ShopUrl + "/" + id);
    }
}