import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Productos } from '../../components/productos/productos';
import { DomSanitizer } from "@angular/platform-browser";
import { MatDialog } from '@angular/material/dialog';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router } from '@angular/router';

//Components
import { ProductosComponent } from '../../components/productos/productos.component';
//Service
import { ProductosService } from '../../servicios/productos.service';
import { CategoriasService } from '../../servicios/categorias.service';
import { CategoriaProductosService } from '../../servicios/categoriaProductos.service';
import { CarritoServiceService } from '../../servicios/carrito-service.service';

//Websocket
import { WebSocketSugerenciasService } from '../../servicios/webSocketSugerencias.service';



@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {

  //WebSockets gif loading
  public loading:boolean;

  constructor(
    private _productosService:ProductosService, 
    private _categoriasService:CategoriasService,
    private _pcService:CategoriaProductosService,
    private activeRoute:ActivatedRoute,
    private sanitizer: DomSanitizer,
    private http:HttpClient,
    public dialog: MatDialog,

    private router:Router,  
    private snackBar: MatSnackBar,
    public carritoService:CarritoServiceService  )
  {
    this.loading = true;
  }

  ngOnInit(): void {
    this.getCategoryId();
    
    //this.getProducts();
    this.getProductsByCategory();

    //categorias
    this.getCategoriesExpasionPanel();

    //webSocket
    this._webSocket();
    this.connectCategories();

  }

  //Expasion Panel
  //lista de categorias, 
  categorias:any;
  getCategoriesExpasionPanel(){
    this._categoriasService.getCategories()
    .subscribe(data => {
      this.categorias = data;
    });
  } 
  //Redireccionar al component categoria con categoryId
  getCategoryIdExpasionPanel1(categoryId:number){    
    this.router.navigate( ["/categoriaExpasionPanel1", categoryId ] );
    console.log("categoryId desde ExpasionPanel1: "+ categoryId );
  }
  getCategoryIdExpasionPanel2(categoryId:number){    
    this.router.navigate( ["/categoriaExpasionPanel2", categoryId ] );
    console.log("categoryId desde ExpasionPanel2: "+ categoryId );
  }
  //FIN Expasion Panel

  

  //obtener categoryId 
  categoria:any={};
  getCategoryId(){
    let categoryId = this.activeRoute.snapshot.paramMap.get('categoryId'); //'categoryId' desde la ruta
    this._categoriasService.getCategoryId(categoryId).subscribe(data =>{   
    this.categoria = data;  
    console.log("Categoria: "); 
    console.log(this.categoria); 
    })
  }
  //Lista de productos
  productos:any=[]; 
  getProducts(){
    this._productosService.getProducts()
    .subscribe(data => {
      this.productos = data;
      console.log(this.productos); 
    });
  } 

  //Lista productos de una categoria ,
  //JOIN con productCategory
  productosByCategory:any=[]; 
  getProductsByCategory(){
    let categoryId = this.activeRoute.snapshot.paramMap.get('categoryId'); //'categoryId' desde la ruta
    this._productosService.getProductsByCategory(categoryId)
    .subscribe(data => {
      this.productosByCategory = data;
      console.log("Productos de la categoria"); 
      console.log(this.productosByCategory); 
    });
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


  
/////////////////////////////////////////////////////////////////////////////////////
  //Probando Websocket
  greeting: any;
  _webSocketSugerenciasService: any = WebSocketSugerenciasService;

  //Llamar al ngOnit
  //creacion de un _webSocket, se esta llamando al constructor de CategoriasComponent
  _webSocket(){
    this._webSocketSugerenciasService = new WebSocketSugerenciasService(
    new CategoriasComponent(
      this._productosService, this._categoriasService, this._pcService,
      this.activeRoute, this.sanitizer , this.http, this.dialog, this.router,
      this.snackBar, this.carritoService),
    this.http);
  }
 
  //Metodo para llamar a los productos
  productosSocket:any = [];
  connectCategories(){
    let categoryId = this.activeRoute.snapshot.paramMap.get('categoryId'); //'categoryId' desde la ruta
    //_connect(categoryId)
    //Primera Conexion
    this._webSocketSugerenciasService._connect(categoryId)    //llamando al metodo connect() del _webSocketService 
    .subscribe((data: Productos[]) => {     
      this.productosSocket = data;
      
      //Loading
      if(!this.productosSocket){
        alert("Error en el servidor!");
      }else{
        this.loading = false;  
      }

      console.log("----------------------------------");
      console.log("Metodo connect() , NUEVOS PRODUCTOS CATEGORIAS");
      //console.log(this.productosSocket);
      console.log("----------------------------------");
    });

    /// SUBJECT
    this._webSocketSugerenciasService._subject
    .subscribe((data: Productos[]) => {  
      this.productosSocket = data;   //pasamos update de los productos

      //Loading 
      /** */
      this.loading = true;
      setTimeout(()=>{                  //delay de 3 segundos, 
      this.productosSocket = data;   //pasamos update de los productos
      this.loading = false;           // activamos el gif
      },4000)                       // durante 3 segundos
      //
    

      console.log("----------------------------------");
      console.log("Metodo connect(), Subject CATEGORIAS");
      console.log(this.productosSocket);
      console.log("----------------------------------");
    });
    
  }



  handleMessage(message:any){
    this.greeting = message;
  }
  



}
