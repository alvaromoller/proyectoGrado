import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from "@angular/platform-browser"
import { MatDialog } from '@angular/material/dialog';
//import { CheckoutComponent } from '../../checkout/checkout.component';
import { Router } from '@angular/router';
import { Productos } from '../../components/productos/productos';

//Components
import { ProductosComponent } from '../../components/productos/productos.component';
//Servicios
import { ProductosService } from '../../servicios/productos.service';
import { CarritoServiceService } from '../../servicios/carrito-service.service';

//html2pdf
import * as html2pdf from 'html2pdf.js';
//printJS
import * as printJS from 'print-js';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  products: Productos[] = [];
  productsCantidad:any[] = [];

  total: number = 0;
  //Sirve para mostrar las filas de la tabla
 displayedColumns: string[] = ['name','price', 'name2', 'img','cantidad', 'details', 'delete'];


  constructor(public carritoService:CarritoServiceService , private sanitizer: DomSanitizer, public productosService:ProductosService, private dialog:MatDialog,private router:Router) { }

  ngOnInit(): void {
    this.getProducts ();
    this.getTotal();
  }

  //obteniendo productos para el carrito
  //cantidad
  getProducts (){
    //this.products = this.carritoService.getProducts();
    this.productsCantidad = this.carritoService.getProductsCantidad(); 
    return this.productsCantidad;
  }


  //convierte a PDF pero sin IMAGEN
  getPdfProducts(){  //id="productsCarrito"
    const options = {
      filename: 'doc.pdf',
      image: {type: 'jpg'},  //jpeg,jpg, png,webp
      html2canvas: {},
      jsPDF: { orientation: 'landscape' } //portrait = vertical, landscape = horizontal
    };

    const content: Element = document.getElementById('productsCarrito');
    html2pdf()
      .from(content)
      .set(options)
      .save();
  }

  //convierte a PDF con IMAGEN
  getPrintJsPdf(){  //id="productsCarrito"
    printJS({
      printable:'productsCarrito',
      type: 'html',
      targetStyle: ['*'],
      imageStyle: 'width:20%',
      header: 'pdf con printJs'

    })
  }


  //obtener la img URl
  public getSantizeUrl(url : string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
  //metodo para obtener imagen de la base de datos
  public getImgUrl(url : string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  //Detalle del producto
  infoProduct(product: Productos) {
    this.productosService.setLast(product);
    const dialogRef = this.dialog.open(ProductosComponent,{
      width: '1040px',height:'550px' ,disableClose: true 
    });
  } 

  //Eliminar producto
  delete(product: Productos){
    this.carritoService.deleteProduct(product);
    this.getProducts();
    console.log("borrar...");
  }

  //total de precios de productos
  getTotal (){
    this.total = this.carritoService.getTotal();
  }

  //Metodo openCheckout nos redirige al CheckoutComponent
  /** 
  openCheckout(): void {
    const dialogRef = this.dialog.open(CheckoutComponent,{
      width: '640px' 
    });
  }
  */
  //Metodo openSale nos redirige al saleComponent
  openSale(){
    this.router.navigate(["sale"]);
  }

}
