import { Component, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { DomSanitizer } from "@angular/platform-browser";
import { ActivatedRoute } from '@angular/router';
import { ProductosComponent } from '../../components/productos/productos.component';
import { ProductosService } from '../../servicios/productos.service';
import { Productos } from '../../components/productos/productos';

import { TiendasComponent } from '../../components/tiendas/tiendas.component';
import { ProductosTiendaService } from '../../servicios/productosTienda.service';
import { ProductosTienda } from '../../components/productos/productosTienda';

import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

 //para llamar listado de productos en ngOnInit
  productos:any;

  //para llamar listado de productos en ngOnInit
  productosSinBd:any;


  //Filter, para las busquedas
  filterPost = "";
  
  //pagination
  public page: number=0;

  constructor(private _productosService:ProductosService,
              private _tiendaService:ProductosTiendaService,
              private router:Router,
              private activeRoute:ActivatedRoute,
              private sanitizer: DomSanitizer,
              private http:HttpClient,
              public dialog: MatDialog ) { }

 
  ngOnInit(): void {
    this.getProducts();
    this.getProducts2();
  }
    
  //PRUEBA, lista de productos SIN BASE DE DATOS
  getProducts2(){
    this._productosService.getProducts()
    .subscribe(data => {
      this.productosSinBd = data;
    });
    //console.log("Listado de productos extraidos sin base de datos: \n"+this.productosSinBd);

  } 

  //lista de productos
  getProducts(){
    this._productosService.getProducts()
    .subscribe(data => {
      this.productos = data;
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

  
/////////////////////////////////////////////////////////////////////////////////////



}
