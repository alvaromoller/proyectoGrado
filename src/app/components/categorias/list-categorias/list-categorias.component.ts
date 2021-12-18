import { Component, OnInit } from '@angular/core';
import { CategoriasService } from '../../../servicios/categorias.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-list-categorias',
  templateUrl: './list-categorias.component.html',
  styleUrls: ['./list-categorias.component.css']
})
export class ListCategoriasComponent implements OnInit {

  constructor( private _categoriasService:CategoriasService,
               private router:Router) { }

  ngOnInit(): void {
    this.getCategories();
  }


  //lista de categorias
  categorias:any;
  getCategories(){
    this._categoriasService.getCategories()
    .subscribe(data => {
      this.categorias = data;
    });
  } 


   //Redirige al componente PRODUCT con su productId y sus llaves foraneas tiendaId,marcaId,tipoProductoId
   getCategoryId(categoriaId:number){
    this.router.navigate( ["/categoria", categoriaId ] );
    console.log(categoriaId);
  }
  

}
