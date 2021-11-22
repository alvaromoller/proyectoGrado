import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from "rxjs";
import { tipoProducto } from '../components/productos/tipoProducto';

@Injectable({
    providedIn: 'root'
})
export class TipoProductoService {

    private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    
    constructor(private http:HttpClient) { }

    productTypeUrl:string = 'http://localhost:8080/v1/productType';

    //conexión con el backend, 
    //lista de productos    
    getProductType(): Observable<tipoProducto[]>{
        return this.http.get<tipoProducto[]>(this.productTypeUrl);
    }

    //Encontrar producto por ID
    getProductTypeId(id:any):Observable<any>{
        return this.http.get<tipoProducto[]>(this.productTypeUrl + "/" + id);
    }
}