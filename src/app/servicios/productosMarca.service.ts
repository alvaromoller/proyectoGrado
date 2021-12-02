import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from "rxjs";
import { Marcas } from '../components/productos/productosMarca';

@Injectable({
    providedIn: 'root'
})
export class ProductosMarcasService {

    private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    
    constructor(private http:HttpClient) { }

    BrandUrl:string = 'http://localhost:8080/v1/brand';
    BrandUrlCrawler:string = 'http://localhost:8080/v1/brand/crawler1';

    //conexión con el backend, 
    //lista de productos    
    getBrands(): Observable<Marcas[]>{
        return this.http.get<Marcas[]>(this.BrandUrl);
    }

    //Encontrar producto por ID
    getBrandId(id:any):Observable<any>{
        return this.http.get<Marcas[]>(this.BrandUrl + "/" + id);
    }


}