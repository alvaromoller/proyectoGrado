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

    ProductUrl:string = 'http://localhost:8080/v1/product';

    //conexión con el backend, 
    //lista de productos    
    getProducts(): Observable<Productos[]>{
        return this.http.get<Productos[]>(this.ProductUrl);
    }

    //Encontrar producto por ID
    getProductId(id:any):Observable<any>{
        return this.http.get<Productos[]>(this.ProductUrl + "/" + id);
    }
}