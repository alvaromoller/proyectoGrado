import { Component, OnInit } from '@angular/core';
import { TiendasService, tiendasInterface } from '../../servicios/tiendas.service';
import { ProductosTiendaService } from '../../servicios/productosTienda.service';

import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from "@angular/platform-browser"



@Component({
  selector: 'app-tiendas',
  templateUrl: './tiendas.component.html',
  styleUrls: ['./tiendas.component.css']
})
export class TiendasComponent implements OnInit {


  //creando variable de tipo TiendasService para llamar metodos
  constructor( private _tiendasService:TiendasService,
               private _tiendaService:ProductosTiendaService,
               private dialog: MatDialog,
               private sanitizer: DomSanitizer               ) { }


  ngOnInit(): void {


  }

  //metodo para obtener imagen de la base de datos
  public getImgUrl(url : string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  /////////////////////////////////////////////////////////////////////////////////////


  /////////////////////////////////////////////////////////////////////////////////////



}
