import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from "rxjs";
import { ProductosDetalle } from '../../app/components/productos/productosDetalle';

@Injectable({
    providedIn: 'root'
})
export class ProductosDetalleService {

    private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    
    constructor(private http:HttpClient) { }

    ProductUrl:string = 'http://localhost:8080/v1/productDetail';

    //conexión con el backend, 
    //lista de productos detalle   
    getProductsDetail(): Observable<ProductosDetalle[]>{
        return this.http.get<ProductosDetalle[]>(this.ProductUrl);
    }

    //Encontrar producto por ID
    getProductDetailId(id:any):Observable<any>{
        return this.http.get<ProductosDetalle[]>(this.ProductUrl + "/" + id);
    }
}