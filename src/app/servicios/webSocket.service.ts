import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from "rxjs";

import { HomeComponent } from '../components/home/home.component';


@Injectable({
    providedIn: 'root'
})

export class WebSocketService {    

    private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    
    constructor(private http:HttpClient) { }

    ProductUrl:string = 'http://localhost:8080/v1/product';         //direccion

    


}
