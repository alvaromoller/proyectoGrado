import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { ProductosTiendaService } from '../../../servicios/productosTienda.service';



@Component({
  selector: 'app-ventana-emergente-tiendas',
  templateUrl: './ventana-emergente-tiendas.component.html',
  styleUrls: ['./ventana-emergente-tiendas.component.css']
})
export class VentanaEmergenteTiendasComponent implements OnInit {

  constructor( private _tiendaService:ProductosTiendaService, 
               private activeRoute:ActivatedRoute,
               private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getshopId();
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

  close(){
    this.dialog.closeAll();
  }

}
