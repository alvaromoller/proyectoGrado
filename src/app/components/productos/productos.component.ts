import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from "@angular/platform-browser"
import { ProductosService } from '../../servicios/productos.service';
import { ProductosMarcasService } from '../../servicios/productosMarca.service';
import { TipoProductoService } from '../../servicios/tipoProducto.service';
import { ProductosTiendaService } from '../../servicios/productosTienda.service';

import { Productos } from '../productos/productos';
import { Marcas } from '../productos/productosMarca';
import { ActivatedRoute } from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { ProductosTienda } from './productosTienda';




@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  //productos:any;
  constructor(private _productoService:ProductosService, 
              private _marcaService:ProductosMarcasService ,
              private _tipoProductoService:TipoProductoService, 
              private _tiendaService:ProductosTiendaService, 
              private activeRoute:ActivatedRoute,
              private sanitizer: DomSanitizer ) {
   }

  ngOnInit(): void {
    this.getProductId();
    this.getBrandId();
    this.getProductTypeId();
    this.getshopId();

  }

  
  //metodo para obtener imagen de la base de datos
  public getImgUrl(url : string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  /**ESTRUCTURA DE info Product*/
  producto:any={};
  productForm = new FormGroup({
    productId: new FormControl(''),
    name: new FormControl(''),
    description: new FormControl(''),
    img: new FormControl(''),
    procesador: new FormControl(''),
    memoriaRam: new FormControl(''),
    discoAlmacenamiento: new FormControl(''),
    tarjetaVideo: new FormControl(''),
    pantalla: new FormControl(''),

    brandId: new FormControl(''),
    shopId: new FormControl(''),
    productTypeId: new FormControl(''),
  });

  //probar solo ccon   getProductId(id:any)
  getProductId(){
    let producotId = this.activeRoute.snapshot.paramMap.get('id'); 
    this._productoService.getProductId(producotId).subscribe(data =>{   
    this.producto = data;  
      //
      this.productForm.setValue({
      'productId': this.producto.productId,
      'name': this.producto.name,
      'description': this.producto.description,
      'img': this.producto.img,
      'procesador': this.producto.procesador,
      'memoriaRam': this.producto.memoriaRam,
      'discoAlmacenamiento': this.producto.discoAlmacenamiento,
      'tarjetaVideo': this.producto.tarjetaVideo,
      'pantalla': this.producto.pantalla,

      'brandId': this.producto.brandId,
      'shopId': this.producto.shopId,
      'productTypeId': this.producto.productTypeId,
      })   
      //
      console.log(this.productForm.value); 
    })

  }


  /**ESTRUCTURA DE info Marca*/
  marca:any={};

  //probar solo con getBrandId(id:any)
  getBrandId(){
    let marcaId = this.activeRoute.snapshot.paramMap.get('id'); 
    this._marcaService.getBrandId(marcaId).subscribe(data =>{   
    this.marca = data;  
    console.log(this.marca); 
    })
  }


  
  /**ESTRUCTURA DE info tipo-producto*/
  tipoProducto:any={};

  //probar solo ccon   getProductTypeId(id:any)
  getProductTypeId(){
    let tipoProductoId = this.activeRoute.snapshot.paramMap.get('id'); 
    this._tipoProductoService.getProductTypeId(tipoProductoId).subscribe(data =>{   
    this.tipoProducto = data;  

    console.log(this.tipoProducto); 
    })
  }

/**ESTRUCTURA DE info Tienda*/
tienda:any={};

//probar solo ccon   getShopId(id:any)
getshopId(){
  let shopId = this.activeRoute.snapshot.paramMap.get('id'); 
  this._tiendaService.getShopId(shopId).subscribe(data =>{   
  this.tienda = data;  
  
  console.log(this.tienda); 
  })
}


}
