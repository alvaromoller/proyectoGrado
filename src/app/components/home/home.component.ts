import { Component, OnInit } from '@angular/core';
import { TiendasService, tiendasInterface } from '../../servicios/tiendas.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

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
