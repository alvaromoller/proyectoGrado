import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Productos } from '../components/productos/productos';

import {Observable, BehaviorSubject, ReplaySubject} from "rxjs";
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';

import { Subject } from 'rxjs';
import { HomeComponent } from '../components/home/home.component';

@Injectable({
    providedIn: 'root'
})

export class WebSocketHomeService {    

    //prueba, usar el subject para el metodo onMessageReceivedHome
    public _subject: Subject<any> = new BehaviorSubject<any>([]);
    //private lista:Array<String> = [""] ;        


    //Productos
    ProductUrl:string = 'http://localhost:8080/v1/product';         //direccion
    
    //websocket
    webSocketEndPoint: string = 'http://localhost:8080/ws';
    topic: string = "/topic/products";                              // topic, pertenece a la clase controller donde se llama al saludo
    stompClient: any;

    //para el metodo onMessageReceivedHome
    homeSocket: HomeComponent;

    constructor(homeSocket:HomeComponent, 
                private http:HttpClient) 
        { 
            this.homeSocket = homeSocket;
        }


    //Conexion para llamar a los productos 
    _connect(): Observable<Productos[]> {
        console.log("Initialize WebSocket Connection With Products");
        let ws = new SockJS(this.webSocketEndPoint);
        this.stompClient = Stomp.over(ws);
        const _this = this;

        _this.stompClient.connect({}, function (frame:any) {
            _this.stompClient.subscribe(_this.topic, function (sdkEvent:any) {  //TOPIC2 llama al metodo de backend        
                _this.onMessageReceivedHome(sdkEvent);          //llamamos al metodo onMessageReceived    
                console.log("hello Word CompuCenter");
                console.log("-------------");

            });
            //_this.stompClient.reconnect_delay = 2000;
        }, this.errorCallBack);
        
       return this.http.get<Productos[]>(this.ProductUrl);
    };


    // on error, schedule a reconnection attempt
    //llamamos al metodo _connect()
    errorCallBack(error:any) {
        console.log("errorCallBack -> " + error)
        setTimeout(() => {
            this._connect();
        }, 5000);
    }
    

    //para HomeComponent, metodo connect3()
    //onMessageReceived enviamos al metodo _connect()
    onMessageReceivedHome(message:any) {
        console.log("Message Recieved from Server :: " + message);
        this.homeSocket.handleMessage(JSON.stringify(message.body));
        this._subject.next(message.body);    //Subject
    }


 

}

