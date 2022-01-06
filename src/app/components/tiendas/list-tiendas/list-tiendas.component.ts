import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TiendasService, tiendasInterface } from '../../../servicios/tiendas.service';
import { DomSanitizer } from "@angular/platform-browser";
import { ProductosTiendaService } from '../../../servicios/productosTienda.service';
import { ProductosService } from '../../../servicios/productos.service';
import { MatDialog } from '@angular/material/dialog';



@Component({
  selector: 'app-list-tiendas',
  templateUrl: './list-tiendas.component.html',
  styleUrls: ['./list-tiendas.component.css']
})
export class ListTiendasComponent implements OnInit {

//falta ingresar productos que pertenecen a una tienda en especifico
//producto 1,2,3 pertenecen a tienda 1
//producto 4,5,6 pertenecen a tienda 2
//producto 7,8,9 pertenecen a tienda 3
productos:any;
 //creando variable de tipo TiendasService para llamar metodos
 constructor( 
              private _tiendasService:ProductosTiendaService,
              private _productosService:ProductosService,
              private activeRoute:ActivatedRoute,
              private sanitizer: DomSanitizer,
              private dialog: MatDialog) { }

 
  ngOnInit(): void {
    this.getShopId();
    //this.getProducts();
    //this.getProductId();
    this.getShopLastId();
  }

  //ID de tienda
  tienda:any={};
  getShopId(){
    let shopId = this.activeRoute.snapshot.paramMap.get('tiendaId'); 
    this._tiendasService.getShopId(shopId).subscribe(data =>{   
    this.tienda = data;  
    console.log(this.tienda); 
    })
  }


  
  //lista de productos
  getProducts(){
    this._productosService.getProducts()
    .subscribe(data => {
      this.productos = data;
    });
  } 

  //Id de producto
  producto:any={};
  getProductId(){
    let productoId = this.activeRoute.snapshot.paramMap.get('tiendaId'); 
      this._productosService.getProductId(productoId).subscribe(data =>{   
      this.producto = data;  
      console.log(this.producto); 
      })
  }

  
  //metodo para obtener imagen de la base de datos
  public getImgUrl(url : string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  /////////////////////////////////////////////////////////////////////////////////////
  //OBTENER ultimo producto
  shopLast:any;
  getShopLastId(){
    this.shopLast = this._tiendasService.getLast();
  }
  close(){
    this.dialog.closeAll();
  }

  /////////////////////////////////////////////////////////////////////////////////////  




}
