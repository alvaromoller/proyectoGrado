import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Productos } from '../components/productos/productos';
import { ProductosCategorias } from '../components/categorias/productCategory';

import {Observable, BehaviorSubject, ReplaySubject} from "rxjs";
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';

import { Subject } from 'rxjs';
import { HomeComponent } from '../components/home/home.component';
import { CategoriasComponent } from '../components/categorias/categorias.component';


@Injectable({
    providedIn: 'root'
})

export class WebSocketSugerenciasService {    

    //prueba, usar el subject para el metodo onMessageReceivedHome
    public _subject: Subject<any> = new BehaviorSubject<any>([]);
    //private lista:Array<String> = [""] ;        


    //ProductosCategoria
    pcUrl:string = 'http://localhost:8080/v1/productCategory/productsByCategory';      //direccion de productos 

    //websocket
    webSocketEndPoint: string = 'http://localhost:8080/ws';
    topic: string = "/topic/products";                              // topic, pertenece a la clase controller donde se llama al saludo
    stompClient: any;

    //para el metodo onMessageReceivedHome
    //homeSocket: HomeComponent;
    categorySocket: CategoriasComponent;

    constructor(//homeSocket:HomeComponent,
                categorySocket: CategoriasComponent,
                private http:HttpClient) 
        { 
            //this.homeSocket = homeSocket;
            this.categorySocket = categorySocket;
        }


    //Conexion para llamar a los productos 
    _connect(categoryId:any): Observable<Productos[]> {
        console.log("Initialize WebSocket Connection With Products Categories");
        let ws = new SockJS(this.webSocketEndPoint);
        this.stompClient = Stomp.over(ws);
        const _this = this;

        _this.stompClient.connect({}, function (frame:any) {
            _this.stompClient.subscribe(_this.topic, function (sdkEvent:any) {  //TOPIC llama al metodo de backend        
                _this.onMessageReceivedHome(sdkEvent);          //llamamos al metodo onMessageReceived    
                console.log("hello Word WebSocket Producto Categoria");
                console.log("-------------");

            });
            //_this.stompClient.reconnect_delay = 2000;
        }, this.errorCallBack);
        
       return this.http.get<Productos[]>(this.pcUrl + "/" + categoryId);

    };


    // on error, schedule a reconnection attempt
    //llamamos al metodo _connect()
    categoryId:any
    errorCallBack(error:any) {
        console.log("errorCallBack -> " + error)
        setTimeout(() => {
            this._connect(this.categoryId);
        }, 5000);
    }
    

    //onMessageReceived enviamos al metodo _connect()
    onMessageReceivedHome(message:any) {
        console.log("Message Recieved from Server :: " + message);
        this.categorySocket.handleMessage(JSON.stringify(message.body));
        this._subject.next(message.body);    //Subject
    }


 

}

