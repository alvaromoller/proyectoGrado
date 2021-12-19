import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from "rxjs";
import { ProductosCategorias } from '../components/categorias/productCategory';


@Injectable({
    providedIn: 'root'
})
export class CategoriaProductosService {

    private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    
    constructor(private http:HttpClient) { }

    pcUrl:string = 'http://localhost:8080/v1/productCategory';

    //conexión con el backend, 
    //lista de productCategory    
    getPc(): Observable<ProductosCategorias[]>{
        return this.http.get<ProductosCategorias[]>(this.pcUrl);
    }

    //Encontrar productCategory por ID
    getPcId(id:any):Observable<any>{
        return this.http.get<ProductosCategorias[]>(this.pcUrl + "/" + id);
    }

}