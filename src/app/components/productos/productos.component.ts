import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from "@angular/platform-browser"
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ProductosService } from '../../servicios/productos.service';
import { ProductosMarcasService } from '../../servicios/productosMarca.service';
import { TipoProductoService } from '../../servicios/tipoProducto.service';
import { ProductosTiendaService } from '../../servicios/productosTienda.service';

import { Productos } from '../productos/productos';
import { Marcas } from '../productos/productosMarca';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { ProductosTienda } from './productosTienda';




@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  encapsulation:ViewEncapsulation.None,
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  constructor(private _productoService:ProductosService, 
              private _marcaService:ProductosMarcasService ,
              private _tipoProductoService:TipoProductoService, 
              private _tiendaService:ProductosTiendaService,
              private activeRoute:ActivatedRoute,
              private sanitizer: DomSanitizer,
              public modal: NgbModal,
              private dialog: MatDialog              ) {}

  ngOnInit(): void {
    this.getProductId(); //product tiene llave foranea de shop, brand, typeProduct
    //this.getBrandId();  
    //this.getProductTypeId();
    this.getshopId();


    //prueba llamando a lastProduct
    this.getProductLastId();
  }

  ///////////////////////////////////////////////////////////////////////////
  //metodo para obtener imagen de la base de datos
  public getImgUrl(url : string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
  //Boton para el Modal
  openModal(contenido:any){
    this.modal.open(contenido,{scrollable:true, size:"lg", centered:true, backdropClass:"azul", windowClass:"oscuro"});
  }


  /**ESTRUCTURA DE info Product*/
  producto:any={};
  getProductId(){
    let productId = this.activeRoute.snapshot.paramMap.get('id'); 
    this._productoService.getProductId(productId).subscribe(data =>{   
    this.producto = data;  
      // 
      console.log(this.producto); 
    })
  }

  /**ESTRUCTURA DE info Tienda*/
  tienda:any={};
  getshopId(){
    //tiendaId llave foranea extraida desde la ruta y home.ts
    let shopId = this.activeRoute.snapshot.paramMap.get('tiendaId'); 
    this._tiendaService.getShopId(shopId).subscribe(data =>{   
    this.tienda = data;  
    //this.tienda = shopId;  
    
    console.log(this.tienda); 
    })
  }


/////////////////////////////////////////////////////////////////////////////////////
  //OBTENER ultimo producto
  productLast:any;
  getProductLastId(){
    this.productLast = this._productoService.getLast();
  }
  close(){
    this.dialog.closeAll();
  }

  /////////////////////////////////////////////////////////////////////////////////////

  /**ESTRUCTURA DE info Marca*/
  marca:any={};
  //probar solo con getBrandId(id:any)
  getBrandId(){
    let marcaId = this.activeRoute.snapshot.paramMap.get('marcaId'); 
    this._marcaService.getBrandId(marcaId).subscribe(data =>{   
    this.marca = data;  
    console.log(this.marca); 
    })
  }


  
  /**ESTRUCTURA DE info tipo-producto*/
  tipoProducto:any={};
  //probar solo ccon   getProductTypeId(id:any)
  getProductTypeId(){
    let tipoProductoId = this.activeRoute.snapshot.paramMap.get('tipoProductoId'); 
    this._tipoProductoService.getProductTypeId(tipoProductoId).subscribe(data =>{   
    this.tipoProducto = data;  

    console.log(this.tipoProducto); 
    })
  }





}
