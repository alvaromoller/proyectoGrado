import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from '../../servicios/productos.service';
import { CategoriasService } from '../../servicios/categorias.service';
import { CategoriaProductosService } from '../../servicios/categoriaProductos.service';

import { ProductosComponent } from '../../components/productos/productos.component';
import { Productos } from '../../components/productos/productos';
import { DomSanitizer } from "@angular/platform-browser";
import { MatDialog } from '@angular/material/dialog';




@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {

  constructor(private _productosService:ProductosService, 
              private _categoriasService:CategoriasService,
              private _pcService:CategoriaProductosService,
              private activeRoute:ActivatedRoute,
              private sanitizer: DomSanitizer,
              public dialog: MatDialog    ) { }

  ngOnInit(): void {
    this.getCategoryId();
    
    //this.getProducts();
    this.getProductsByCategory();
  }


    

  
  //obtener categoryId 
  categoria:any={};
  getCategoryId(){
    let categoryId = this.activeRoute.snapshot.paramMap.get('categoryId'); //'categoryId' desde la ruta
    this._categoriasService.getCategoryId(categoryId).subscribe(data =>{   
    this.categoria = data;  
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

  
/////////////////////////////////////////////////////////////////////////////////////




}
