import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from '../../servicios/productos.service';



@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {

  constructor( private _productoService:ProductosService, 
               private activeRoute:ActivatedRoute    ) { }

  ngOnInit(): void {
  }

  //obtener productId
  producto:any={}; 
   getProductId(){
    let productId = this.activeRoute.snapshot.paramMap.get('id'); 
    this._productoService.getProductId(productId).subscribe(data =>{   
    this.producto = data;  
      console.log(this.producto); 
    })
  }
 

}
