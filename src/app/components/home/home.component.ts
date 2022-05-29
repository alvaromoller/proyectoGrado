import { Component, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { DomSanitizer } from "@angular/platform-browser";
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { Productos } from '../../components/productos/productos';
import { ProductosTienda } from '../../components/productos/productosTienda';
import {MatSnackBar} from '@angular/material/snack-bar';
import {interval, timer} from 'rxjs';
//Components
import { ProductosComponent } from '../../components/productos/productos.component';
import { TiendasComponent } from '../../components/tiendas/tiendas.component';
//Service
import { ProductosService } from '../../servicios/productos.service';
import { ProductosTiendaService } from '../../servicios/productosTienda.service';
import { CarritoServiceService } from '../../servicios/carrito-service.service';

//Websocket
import { WebSocketHomeService } from '../../servicios/webSocketHome.service';
import { WebSocketComponent } from '../../components/webSocket/web-socket/web-socket.component';
import { NumberSymbol } from '@angular/common';




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  //Filter, para las busquedas
  filterPost = "";
  //pagination
  public page: number=0;

  //WebSockets gif loading
  public loading:boolean;

  constructor(
    private _productosService:ProductosService,
    private _tiendaService:ProductosTiendaService,
    private router:Router,
    private activeRoute:ActivatedRoute,
    private sanitizer: DomSanitizer,
    private http:HttpClient,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    public carritoService:CarritoServiceService)
  {
    this.loading = true;
  }

 
  ngOnInit(): void {
    //this.setInterval2();
    this.getProducts();
    this.getProducts2();
    
    //webSocket
    this._webSocket();
    this.connectCompuCenter();

  }



  intervalId:any;
  setInterval2(){
    this.intervalId = setInterval( () => {
      console.log('contador');
      console.log("data");
    },1000);
  }



  //lista de productos
  productosSinFiltro:any = [];
  getProducts(){
    /** */
    this._productosService.getProducts()
    .subscribe(data => {
      this.productosSinFiltro = data;
      console.log('Productos');
      console.log(this.productosSinFiltro);
    });

  } 

  //Redirige al componente PRODUCTOS con su productId y sus llaves foraneas tiendaId,marcaId,tipoProductoId
  //, marcaId:number, tipoProductoId:number
  getProductId(id:number, tiendaId:number){
    this.router.navigate( ["/producto", id, tiendaId ] );
    console.log(id);
  }

  //metodo para obtener imagen de la base de datos
  public getImgUrl(url : string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  /////////////////////////////////////////////////////////////////////////////////////
  //nueva metodo ventana emergente
  //metodo para ver inf. de nuestro producto
  productInfo(product: Productos) {
    this._productosService.setLast(product);
    const dialogRef = this.dialog.open(ProductosComponent,{
      width: '1040px',height:'550px',disableClose: true 
    });
  }

  //////////////////////////////////////////////
  //Añadir al carrito
  addToCart(product: Productos){
    this.carritoService.addProduct(product);
    let sb = this.snackBar.open("Producto añadido","Ver carrito", {
      duration: 2000,
    });
    sb.onAction().subscribe(() => {
       this.router.navigateByUrl('/carrito')
    });
  }


  //////////////////////////////////////////////
  //PROBANDO Multi filter 
  //Arreglo de cajas, Chechbox
  checkbox: any = [
    { id: 1, type:"checkbox", brand:"HP",     ram:"4 GB"  , price: 1000 },
    { id: 2, type:"checkbox", brand:"DELL",   ram:"8 GB"  , price: 2000 },
    { id: 3, type:"checkbox", brand:"Lenovo", ram:"12 GB" , price: 3000 },
    { id: 4, type:"checkbox", brand:"Asus",   ram:"16 GB" , price: 4000 }
  ];

  
  //lista de productos
  productos:any = [];
  productos2:any = [];
  getProducts2(){
    this._productosService.getProductsPc()
    .subscribe(data => {
        this.productos = data;
        this.productos2 = data;
    });

  } 

  //Comparacion con MARCA
  filter1: any= [];
  newfilter2: any= []; 
  ModifyFilterBrand(event:any) {    
    if(event.target.checked){             // si se marca una caja realiza la condicion
      console.log(event.target.value);    // obtiene el caja.marca del arreglo checkbox para comparar
      this.filter1 = this.productos2.filter((e:any) => e.brand == event.target.value )            // si el productos2.marca == caja.marca mostrar el arreglo item{id,marca}
      //console.log(this.filter1);           // obtiene el id y precio del arreglo Items

      this.productos =[];                      
      this.newfilter2.push(this.filter1);     // captura los checkbox que se seleccionan
      //console.log(this.newfilter2);         // muestra los checkbox en un solo arreglo

      for(let i=0; i < this.newfilter2.length; i++){    //recorrido de todos los checkbox seleccionados
        var auxArray = this.newfilter2[i];              // guardamos en un auxArray
        //console.log(auxArray);                        // muestra los items en arreglos separados []
      
        for(let i=0; i < auxArray.length; i++){
          var auxArray2 = auxArray[i];
          //console.log(auxArray2);                     //muestra los items en arreglos separados {}
          this.productos.push(auxArray2);                  //captura y muestra en el frontend los checkbox que se seleccionan
          console.log(this.productos);                     //muestra los items en arreglos separados {}
        }//For
      }//For

    }
    else{
      this.filter1 = this.productos.filter((e:any) => e.brand != event.target.value )            // si el item.ID != caja.ID mostrar el arreglo item{id,precio}
      this.newfilter2 = [];
      this.productos = [];
      this.newfilter2.push(this.filter1);
      //console.log(this.filter1);                       // al desmarcar un checkbox debe desaparecer el dato obtenido

      for(let i=0; i < this.newfilter2.length; i++){    //recorrido de todos los checkbox seleccionados
        var auxArray = this.newfilter2[i];              // guardamos en un auxArray
        //console.log(auxArray);                        // muestra los items en arreglos separados []
      
        for(let i=0; i < auxArray.length; i++){
          var auxArray2 = auxArray[i];
          //console.log(auxArray2);                     //muestra los items en arreglos separados {}
          this.productos.push(auxArray2);               //captura y muestra en el frontend los checkbox que se seleccionan
          //console.log(this.productos);                //muestra los items en arreglos separados {}
        }//For
      }//For

    }
  }






  //////////////////////////////////////////////
  //Probando Websocket
  greeting: any;
  _webSocketHomeService: any = WebSocketHomeService;

  //Llamar al ngOnit
  //creacion de un _webSocketHomeService, se esta llamando al constructor de HomeComponent
  _webSocket(){
    this._webSocketHomeService = new WebSocketHomeService(
      new HomeComponent(this._productosService, this._tiendaService, this.router, this.activeRoute, this.sanitizer , this.http, this.dialog,this.snackBar, this.carritoService),
      this.http);
  }

  /**    
     this._productosService.getProducts()
    .subscribe(data => {
      this.productosSinFiltro = data;
      console.log('Productos');
      console.log(this.productosSinFiltro);
    });
     */
  //Metodo para llamar a los productos
  //CompuCenter
  productosSocket:any = [];
  connectCompuCenter(){
    //Primera Conexion
    this._webSocketHomeService._connect()    //llamando al metodo connect() del _webSocketService 
    .subscribe((data: Productos[]) => {     
      this.productosSocket = data;
      
      //Loading
      if(!this.productosSocket){           //si es distinto a productosSocket
        alert("Error en el servidor!");
      }else{
        this.loading = false;             //si no, false dejara de mostrar el gif
      }
      
      console.log("----------------------------------");
      console.log("Metodo connect(),  PRODUCTOS Home");
      console.log(this.productosSocket);
      console.log("----------------------------------");
    });

    /// SUBJECT
    this._webSocketHomeService._subject
    .subscribe((data: Productos[]) => {  
      this.productosSocket = data;   //pasamos update de los productos

      //Loading 
      this.loading = true;
      setTimeout(()=>{                  //delay de 5 segundos, 
      this.productosSocket = data;      //pasamos update de los productos
      this.loading = false;             // deja de mostrar el gif
      },5000)                           // durante 3 segundos
      
    

      console.log("----------------------------------");
      console.log("Metodo connect(), Subject");
      console.log(this.productosSocket);
      console.log("----------------------------------");
    });
    
  }


  handleMessage(message:any){
    this.greeting = message;
  }
  



}
