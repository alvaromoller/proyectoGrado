import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../../../servicios/productos.service';
import { MatDialog } from '@angular/material/dialog';
import { Productos } from '../productos';
import { Router } from '@angular/router';


@Component({
  selector: 'app-list-productos',
  templateUrl: './list-productos.component.html',
  styleUrls: ['./list-productos.component.css']
})
export class ListProductosComponent implements OnInit {

  //creando arreglo[] para ngFor
  //producto:Productos[] = [];
 
  //para llamar listado de productos en ngOnInit
  productos:any;

  //creando variable de tipo ProductosService para llamar metodos
  constructor( private _productosService:ProductosService ) {
    //this.producto = [];
   }

 
  ngOnInit(): void {
    this._productosService.getProducts()
    .subscribe(data =>{
      this.productos = data;
    })
   console.log("lista productos");
  }

  getProductId(id:number){
    console.log(id);
  }



}


