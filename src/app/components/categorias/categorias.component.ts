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
    this.getProductId();
  }


  //obtener productId
  productoId:any={}; 
   getProductId(){
    let productId = this.activeRoute.snapshot.paramMap.get('productId'); 
    this._productoService.getProductId(productId).subscribe(data =>{   
    this.productoId = data;  
      console.log(this.productoId); 
    })
  }
 

}
