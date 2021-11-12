import { Component, OnInit } from '@angular/core';
import { TiendasService, tiendasInterface } from '../../servicios/tiendas.service';
import { ProductosService } from '../../servicios/productos.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

 //creando arreglo[] para almacenar contenido de TiendasService
 tiendas:tiendasInterface[] = [];

 //para llamar listado de productos en ngOnInit
  productos:any;
 //creando variable de tipo TiendasService para llamar metodos
 constructor( private _productosService:ProductosService, private router:Router ) { }

 
  ngOnInit(): void {
   this._productosService.getProducts()
   .subscribe(data =>{
    this.productos = data;
   })
  }

  //redirige al componente PRODUCTOS con su ID
  getProductId(id:number){
    this.router.navigate( ["/producto", id] );
    console.log(id);
  }

}
