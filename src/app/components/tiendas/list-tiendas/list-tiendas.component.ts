import { Component, OnInit } from '@angular/core';
import { TiendasService, tiendasInterface } from '../../../servicios/tiendas.service';

@Component({
  selector: 'app-list-tiendas',
  templateUrl: './list-tiendas.component.html',
  styleUrls: ['./list-tiendas.component.css']
})
export class ListTiendasComponent implements OnInit {


 //creando variable de tipo TiendasService para llamar metodos
 constructor( private _tiendasService:TiendasService ) { }

 
  ngOnInit(): void {

  }

}
