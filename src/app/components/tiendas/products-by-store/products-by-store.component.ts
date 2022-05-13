import { Component, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { DomSanitizer } from "@angular/platform-browser";
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { Productos } from '../../../components/productos/productos';
import { ProductosTienda } from '../../../components/productos/productosTienda';
import {MatSnackBar} from '@angular/material/snack-bar';
//Components
import { ProductosComponent } from '../../../components/productos/productos.component';
import { TiendasComponent } from '../../../components/tiendas/tiendas.component';
//Service
import { ProductosService } from '../../../servicios/productos.service';
import { ProductosTiendaService } from '../../../servicios/productosTienda.service';
import { CarritoServiceService } from '../../../servicios/carrito-service.service';

//Websocket
import { WebSocketHomeService } from '../../../servicios/webSocketHome.service';

@Component({
  selector: 'app-products-by-store',
  templateUrl: './products-by-store.component.html',
  styleUrls: ['./products-by-store.component.css']
})
export class ProductsByStoreComponent implements OnInit {

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
    this.getStoreId();
    this.getProductsByStore();

    //this.getProducts();
    //this.getProducts2();
    
    //webSocket
    //this._webSocket();
    //this.connectCompuCenter();

  }

  //obtener categoryId 
  store:any={};
  getStoreId(){
    let storeId = this.activeRoute.snapshot.paramMap.get('storeId'); //'categoryId' desde la ruta
    this._tiendaService.getShopId(storeId).subscribe(data =>{   
    this.store = data;  
    console.log(this.store); 
    })
  }

  //Lista productos de una categoria ,
  //JOIN con productCategory
  productsByStore:any=[]; 
  getProductsByStore(){
    let storeId = this.activeRoute.snapshot.paramMap.get('storeId'); //'tiendaId' desde la ruta
    this._productosService.getProductsByStore(storeId)
    .subscribe(data => {
      this.productsByStore = data;
      console.log("Productos POR Tienda"); 
      console.log(this.productsByStore); 
    });
  }

  //lista de productos
  productosSinFiltro:any = [];
  getProducts(){
    this._productosService.getProducts()
    .subscribe(data => {
      this.productosSinFiltro = data;
      console.log("productosSinFiltro: "); 
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





}
