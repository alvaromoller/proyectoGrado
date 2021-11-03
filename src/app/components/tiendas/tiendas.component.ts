import { Component, OnInit } from '@angular/core';
import { TiendasService, tiendasInterface } from '../../servicios/tiendas.service';



@Component({
  selector: 'app-tiendas',
  templateUrl: './tiendas.component.html',
  styleUrls: ['./tiendas.component.css']
})
export class TiendasComponent implements OnInit {


  //creando variable de tipo TiendasService para llamar metodos
  constructor( private _tiendasService:TiendasService ) { }


  ngOnInit(): void {


  }


}
