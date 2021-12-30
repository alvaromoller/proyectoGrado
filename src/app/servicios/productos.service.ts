import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from "rxjs";
import { Productos } from '../../app/components/productos/productos';

@Injectable({
    providedIn: 'root'
})
export class ProductosService {

    private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    
    constructor(private http:HttpClient) { }

    ProductUrl:string = 'http://localhost:8080/v1/product';         //direccion de productos de tiendas 1, 2, 3
    pcUrl:string = 'http://localhost:8080/v1/productCategory/productsByCategory';      //direccion de productos de tiendas 4, 5, 3

    //conexión con el backend, 
    //lista de productos    
    getProducts(): Observable<Productos[]>{
        return this.http.get<Productos[]>(this.ProductUrl);
    }

    //listado de productos por categoria,
    //JOIN de tabla product con productCategory
    getProductsByCategory(categoryId:any): Observable<Productos[]>{
        return this.http.get<Productos[]>(this.pcUrl + "/" + categoryId);
    }

    //Encontrar producto por ID
    getProductId(id:any):Observable<any>{
        return this.http.get<Productos[]>(this.ProductUrl + "/" + id);
    }

    //lista de productos, JOIN con productCategory    

}