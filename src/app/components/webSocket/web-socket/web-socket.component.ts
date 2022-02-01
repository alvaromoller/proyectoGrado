import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { WebSocketService } from '../../../servicios/webSocket.service';
import { ProductosComponent } from '../../productos/productos.component';
import { ProductosService } from '../../../servicios/productos.service';
import { Console } from 'console';
import { Productos } from '../../productos/productos';



@Component({
  selector: 'app-web-socket',
  templateUrl: './web-socket.component.html',
  styleUrls: ['./web-socket.component.css']
})
export class WebSocketComponent implements OnInit {

  //Loading Gif
  public loading:boolean;

  constructor(private _productosService:ProductosService, private http:HttpClient) {
    this.loading = true;
   }

  ngOnInit(): void {
    this.webSocket();
    //this.connect();   //Mesagge prueba
    this.connect2();  //Message products

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
    this._webSocketService = new WebSocketService(new WebSocketComponent(this._productosService, this.http), this.http);
  }


  connect(){
    this._webSocketService._connect();
  }

  
  productos2:any = [];
  connect2(){
    this._webSocketService._connect2()    //llamando al metodo connect2() del _webSocketService 
    .subscribe((data: Productos[]) => {     
      this.productos2 = data;

      //Loading
      if(!this.productos2){
        alert("Error en el servidor!");
      }else{
        this.loading = false;
      }
      console.log("----------------------------------");
      console.log("Metodo connect2()");
      console.log(this.productos2);
      console.log("----------------------------------");
    });
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
