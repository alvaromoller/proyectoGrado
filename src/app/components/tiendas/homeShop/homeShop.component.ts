import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from "@angular/platform-browser";
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductosTiendaService } from '../../../servicios/productosTienda.service';
import { ProductosService } from '../../../servicios/productos.service';
import { ListTiendasComponent } from '../../../components/tiendas/list-tiendas/list-tiendas.component';
import { ProductosTienda } from '../../../components/productos/productosTienda';




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
  getShopId(id:number){
    this.router.navigate( ["/listaProductosTienda", id ] );
    console.log(id);
  }



  /////////////////////////////////////////////////////////////////////////////////////
  //nueva metodo ventana emergente
  //metodo para ver inf. de nuestro producto
  shopInfo(tienda: ProductosTienda) {
    this._tiendasService.setLast(tienda);
    const dialogRef = this.dialog.open(ListTiendasComponent,{
      width: '1040px',height:'550px',disableClose: true 
    });
  }
/////////////////////////////////////////////////////////////////////////////////////

  //Redireccionar al component Productos por Tiendacon storeId
  getStoreId(storeId:number){    //no pasamos la llave primaria, enviamos las llaves foraneas
    this.router.navigate( ["/productoPorTienda", storeId ] );
    console.log("storeId:"+ storeId );
  }
/////////////////////////////////////////////////////////////////////////////////////




}
