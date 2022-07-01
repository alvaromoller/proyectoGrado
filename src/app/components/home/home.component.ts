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

  //Imagen
  imgLogos:any[]= [
    {img:'assets/img/imgHome.jpg', description:'Busca la mejor computadora de acuerdo a tus requerimientos.'},
    {img:'assets/img/LaptopWork.jpg'},
    {img:'assets/img/LaptopGamer.jpg'}
  ];
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


  /**metodo de prueba, borrar */
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
    { id: 1, type:"checkbox", brand:"HP",     checked:false, ram:"4 GB"  , price: 1000 },
    { id: 2, type:"checkbox", brand:"DELL",   checked:false, ram:"8 GB"  , price: 2000 },
    { id: 3, type:"checkbox", brand:"LENOVO", checked:false, ram:"12 GB" , price: 3000 },
    { id: 4, type:"checkbox", brand:"HUAWEI", checked:false, ram:"16 GB" , price: 4000 },
    { id: 5, type:"checkbox", brand:"ASUS",   checked:false, ram:"16 GB" , price: 4000 },
    { id: 6, type:"checkbox", brand:"MICROSOFT", checked:false, ram:"16 GB" , price: 4000 },
    { id: 7, type:"checkbox", brand:"SAMSUNG",   checked:false, ram:"16 GB" , price: 4000 }

  ];

  
  //lista de productos
  productos:any = [];
  productos2:any = [];
  getProducts2(){
    this._productosService.getProducts()  //getProductsPc()
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
      this.filter1 = this.productos.filter((e:any) => e.brand != event.target.value )            // si el productos.brand != caja.brand mostrar el arreglo item{id,precio}
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

      if(this.productos.filter((e:any) => e.brand.length < 0 )){
        console.log("ninguna caja seleccionada");
      }

    }//else
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
  

  //probando ejemplo de checkbox , marca, sistema operativo, tipo de red
  Brands: any =[
    {BrandName:"Samsung", Checked:false},
    {BrandName:"Apple", Checked:false},
    {BrandName:"Oppo", Checked:false}
  ];

  OperatingSystems: any =[
    {OSName:"IOS", Checked:false},
    {OSName:"Android", Checked:false}
  ];

  NetworkTypes: any =[
    {NetworkType:"2G", Checked:false},
    {NetworkType:"3G", Checked:false},
    {NetworkType:"4G", Checked:false}
  ];

  //Lista Mobil, tendria q estar en base de datos
  MobileList: any =[
    {price:2500, Name:"Samsung galaxy Note", BrandName:"Samsung", OSName:"Android", NetworkType:"4G", Checked:false},
    {price:2500, Name:"Apple Iphone 6",      BrandName:"Apple",   OSName:"IOS",     NetworkType:"3G", Checked:false},
    {price:2500, Name:"Oppo Max",            BrandName:"Oppo",    OSName:"Android", NetworkType:"2G", Checked:false},
    {price:2500, Name:"Oppo Full",           BrandName:"Oppo",    OSName:"Android", NetworkType:"3G", Checked:false},
    {price:2500, Name:"Oppo Switch",         BrandName:"Oppo",    OSName:"Android", NetworkType:"4G", Checked:false},
    {price:2500, Name:"Apple Iphone 7",      BrandName:"Apple",   OSName:"IOS",     NetworkType:"4G", Checked:false},
    {price:2500, Name:"Samsung galaxy s",    BrandName:"Samsung", OSName:"Android", NetworkType:"3G", Checked:false},
    {price:2500, Name:"Samsung galaxy o",    BrandName:"Samsung", OSName:"Android", NetworkType:"2G", Checked:false},
  ];
    //Lista Mobil, tendria q estar en base de datos
  ProductData: any =[
    {price:2500, Name:"Samsung galaxy Note", BrandName:"Samsung", OSName:"Android", NetworkType:"4G", Checked:false},
    {price:2500, Name:"Apple Iphone 6",      BrandName:"Apple",   OSName:"IOS",     NetworkType:"3G", Checked:false},
    {price:2500, Name:"Oppo Max",            BrandName:"Oppo",    OSName:"Android", NetworkType:"2G", Checked:false},
    {price:2500, Name:"Oppo Full",           BrandName:"Oppo",    OSName:"Android", NetworkType:"3G", Checked:false},
    {price:2500, Name:"Oppo Switch",         BrandName:"Oppo",    OSName:"Android", NetworkType:"4G", Checked:false},
    {price:2500, Name:"Apple Iphone 7",      BrandName:"Apple",   OSName:"IOS",     NetworkType:"4G", Checked:false},
    {price:2500, Name:"Samsung galaxy s",    BrandName:"Samsung", OSName:"Android", NetworkType:"3G", Checked:false},
    {price:2500, Name:"Samsung galaxy o",    BrandName:"Samsung", OSName:"Android", NetworkType:"2G", Checked:false},
  ];

  
  //DisplayProductList: any = [];
  //este metodo sera llamado cada vez que se seleccione un checkbox
  OnChange(event: any) {
    //DisplayProductList llama al vector de lista MobileList
    this.ProductData = [];


  }




  get selectedBrand() {
    //Get all the selected brands
    //return this.ProductData.Brands.filter(opt => opt.Checked)
    return this.Brands.filter(opt => opt.Checked)
  }

  get selectedOS() {
    //Get all the selected Operating systems
    //return this.ProductData.OperatingSystems.filter(opt => opt.Checked)
    return this.OperatingSystems.filter(opt => opt.Checked)
  }

  get selectedNetwork() {
    //Get all the selected networks
    //return this.ProductData.NetworkTypes.filter(opt => opt.Checked)
    return this.NetworkTypes.filter(opt => opt.Checked)
  }


  //fin prueba de filtros
}
