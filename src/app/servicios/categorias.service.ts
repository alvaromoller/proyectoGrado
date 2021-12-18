import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from "rxjs";
import { Categorias } from '../../app/components/categorias/categoria';


@Injectable({
    providedIn: 'root'
})
export class CategoriasService {

    private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    
    constructor(private http:HttpClient) { }

    CategorytUrl:string = 'http://localhost:8080/v1/category';

    //conexión con el backend, 
    //lista de categorias    
    getCategories(): Observable<Categorias[]>{
        return this.http.get<Categorias[]>(this.CategorytUrl);
    }

    //Encontrar producto por ID
    getCategoryId(id:any):Observable<any>{
        return this.http.get<Categorias[]>(this.CategorytUrl + "/" + id);
    }
}