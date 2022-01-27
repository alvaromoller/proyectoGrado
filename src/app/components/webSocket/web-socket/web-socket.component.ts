import { Component, OnInit } from '@angular/core';
import { WebSocketService } from '../../../servicios/webSocket.service';



@Component({
  selector: 'app-web-socket',
  templateUrl: './web-socket.component.html',
  styleUrls: ['./web-socket.component.css']
})
export class WebSocketComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.webSocket();
    //this.connect();
  }

    //////////////////////////////////////////////
  //Probando Websocket
  title = 'angular8-springboot-websocket';
  //_webSocketService: WebSocketService;
  _webSocketService: any = WebSocketService;
  greeting: any;
  name: any=String;

  //Llamar al ngOnit ?
  webSocket(){
    //this.webSocketAPI = new WebSocketAPI(new AppComponent());
    this._webSocketService = new WebSocketService(new WebSocketComponent( ));
  }


  connect(){
    this._webSocketService._connect();
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
