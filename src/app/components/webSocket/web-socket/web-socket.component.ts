import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { WebSocketService } from '../../../servicios/webSocket.service';
import { ProductosComponent } from '../../productos/productos.component';
import { ProductosService } from '../../../servicios/productos.service';



@Component({
  selector: 'app-web-socket',
  templateUrl: './web-socket.component.html',
  styleUrls: ['./web-socket.component.css']
})
export class WebSocketComponent implements OnInit {

  constructor(private _productosService:ProductosService) { }

  ngOnInit(): void {
    this.webSocket();
    this.connect();
    this.connect2();

    this.getProducts();
  }

  //LLamando a producto, lista de productos
  productos:any = [];
  getProducts(){
    this._productosService.getProducts()
    .subscribe(data => {
      this.productos = data;
    });
  } 
  
  //////////////////////////////////////////////
  //Probando Websocket
  title = 'angular8-springboot-websocket';
  //_webSocketService: WebSocketService;
  _webSocketService: any = WebSocketService;
  greeting: any;
  name: any=String;

  //Llamar al ngOnit
  webSocket(){
    //this._webSocketService = new WebSocketService(new WebSocketComponent());
    this._webSocketService = new WebSocketService(new WebSocketComponent(this._productosService));
  }


  connect(){
    this._webSocketService._connect();
  }

  connect2(){
    this._webSocketService._connect2();
  }

  disconnect(){
    this._webSocketService._disconnect();
  }

  sendMessage(){
    this._webSocketService._send(this.name);
  }

  handleMessage(message:any){
    this.greeting = message;
  }


}
