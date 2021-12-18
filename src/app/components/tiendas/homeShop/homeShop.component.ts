import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from "@angular/platform-browser";
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductosTiendaService } from '../../../servicios/productosTienda.service';
import { ProductosService } from '../../../servicios/productos.service';



@Component({
  selector: 'app-homeShop',
  templateUrl: './homeShop.component.html',
  styleUrls: ['./homeShop.component.css']
})
export class homeShopComponent implements OnInit {

  
  tiendas:any;
  //
  productos:any;
  constructor( private _tiendasService:ProductosTiendaService, 
               private _productosService:ProductosService,
               private activeRoute:ActivatedRoute,
               private dialog: MatDialog,
               private sanitizer: DomSanitizer,
               private router:Router,
               public modal: NgbModal) { }

  ngOnInit(): void {
    this.getShops();
  }


  //lista de tiendas
  getShops(){
    this._tiendasService.getShops()
    .subscribe(data => {
      this.tiendas = data;
    });
  } 


  //metodo para obtener imagen de la base de datos
  public getImgUrl(url : string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }


  //Redirige al componente list-tiendas con su shopId 
  //falta ingresar productos que pertenecen a una tienda en especifico
  //producto 1,2,3 pertenecen a tienda 1
  //producto 4,5,6 pertenecen a tienda 2
  //producto 7,8,9 pertenecen a tienda 3
  getShopId(id:number){
    this.router.navigate( ["/listaProductosTienda", id ] );
    console.log(id);
  }




}
