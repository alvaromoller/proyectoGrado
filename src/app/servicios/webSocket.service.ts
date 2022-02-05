import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Productos } from '../../app/components/productos/productos';

import {Observable, BehaviorSubject, ReplaySubject} from "rxjs";
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { AnonymousSubject } from 'rxjs/internal/Subject';
//import * as Stomp from '@stomp/stompjs';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';

import { Client, Message } from '@stomp/stompjs';
import { ProductosComponent } from '../components/productos/productos.component';

import { Subject } from 'rxjs';
import { WebSocketComponent } from '../components/webSocket/web-socket/web-socket.component';
import { HomeComponent } from '../components/home/home.component';

@Injectable({
    providedIn: 'root'
})

export class WebSocketService {    

    //prueba, usar el subject para el metodo onMessage
    public _subject: Subject<any> = new BehaviorSubject<any>([]);
    //private lista:Array<String> = [""] ;        


    //Productos
    ProductUrl:string = 'http://localhost:8080/v1/product';         //direccion
    //websocket
    webSocketEndPoint: string = 'http://localhost:8080/ws';
    topic: string = "/topic/greetings";                             // topic, pertenece a la clase controller donde se llama al saludo
    stompClient: any;

    //Socket para el componente WebSocketComponent
    //para el metodo onMessageReceived
    webSocket: WebSocketComponent;                      

    constructor(webSocket:WebSocketComponent,           //Prueba WebSocketComponent
                private http:HttpClient) 
        { 
            this.webSocket = webSocket;
        }

    
    _connect() {
        console.log("Initialize WebSocket Connection");
        let ws = new SockJS(this.webSocketEndPoint);

        this.stompClient = Stomp.over(ws);
        const _this = this;

        _this.stompClient.connect({}, function (frame:any) {
            _this.stompClient.subscribe(_this.topic, function (sdkEvent:any) {  //TOPIC llama al metodo de backend
                _this.onMessageReceived(sdkEvent);
            });
            //_this.stompClient.reconnect_delay = 2000;
        }, this.errorCallBack);
        
    };

    
    //Conexion para llamar a los productos 
    topic2: string = "/topic/products";         // topic, pertenece a la clase controller donde se llama al saludo
    _connect2(): Observable<Productos[]> {
        console.log("Initialize WebSocket Connection With Products");
        let ws = new SockJS(this.webSocketEndPoint);
        this.stompClient = Stomp.over(ws);
        const _this = this;

        _this.stompClient.connect({}, function (frame:any) {
            _this.stompClient.subscribe(_this.topic2, function (sdkEvent:any) {  //TOPIC3 llama al metodo de backend
                _this.onMessageReceived(sdkEvent);          //llamamos al metodo onMessageReceivedHome    
                console.log("hola Word");
                console.log("-------------");
    
            });
            //_this.stompClient.reconnect_delay = 2000;
        }, this.errorCallBack);
            
           return this.http.get<Productos[]>(this.ProductUrl);
        };




    _disconnect() {
        if (this.stompClient !== null) {
            this.stompClient.disconnect();
        }
        console.log("Disconnected");
    }

    // on error, schedule a reconnection attempt
    //llamamos al metodo _connect()
    errorCallBack(error:any) {
        console.log("errorCallBack -> " + error)
        setTimeout(() => {
            this._connect();
        }, 5000);
    }
    
	//Send message to sever via web socket
    _send(message:any) {
        console.log("calling logout api via web socket");
        this.stompClient.send("/app/hello", {}, JSON.stringify(message));
    }


    //para webSocketComponent, metodo connect2()
    //onMessageReceived enviamos al metodo _connect()
    onMessageReceived(message:any) {
        console.log("Message Recieved from Server :: " + message);
        this.webSocket.handleMessage(JSON.stringify(message.body));
        this._subject.next(message.body);    //Subject
    }



    //retornando Subject
    _returnSubject(){
        return this._subject;
    }


}

