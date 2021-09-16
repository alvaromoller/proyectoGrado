import { Component, OnInit } from '@angular/core';
import { TiendasService, tiendasInterface } from '../../servicios/tiendas.service';



@Component({
  selector: 'app-tiendas',
  templateUrl: './tiendas.component.html',
  styleUrls: ['./tiendas.component.css']
})
export class TiendasComponent implements OnInit {

  //creando arreglo[] para almacenar contenido de TiendasService
  tiendas:tiendasInterface[] = [];

  //creando variable de tipo TiendasService para llamar metodos
  constructor( private _tiendasService:TiendasService ) { }


  ngOnInit(): void {
      //llamando al metodo getTiendas() de tiendas.service
      this.tiendas = this._tiendasService.getTiendas();
      console.log(this.tiendas);

  }


}
