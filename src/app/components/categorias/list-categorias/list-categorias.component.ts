import { Component, OnInit } from '@angular/core';
import { CategoriasService } from '../../../servicios/categorias.service';
import { CategoriaProductosService } from '../../../servicios/categoriaProductos.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';




@Component({
  selector: 'app-list-categorias',
  templateUrl: './list-categorias.component.html',
  styleUrls: ['./list-categorias.component.css']
})
export class ListCategoriasComponent implements OnInit {

  constructor( private _categoriasService:CategoriasService,
               private _pcService:CategoriaProductosService,
               private activeRoute:ActivatedRoute,
               private router:Router) { }

  ngOnInit(): void {
    this.getProductCategories();

    this.getCategories();
    //this.getCategoryId();
  }


  //lista de categorias, nombres
  categorias:any;
  getCategories(){
    this._categoriasService.getCategories()
    .subscribe(data => {
      this.categorias = data;
    });
  } 


  //lista de ProductCategory (llaves foraneas), tabla NxN
  //productoCategorias para el button
  productoCategorias:any;
  getProductCategories(){
    this._pcService.getPc()
    .subscribe(data => {
      this.productoCategorias = data;
    });
  } 


  //redirigir al component Category con su productId y categoryId q son sus llaves foraneas
   //sus llaves foraneas llamaran a variables de product y variables de category
  getPcId(categoryId:number, productId:number){    //no pasamos la llave primaria, enviamos las llaves foraneas
    this.router.navigate( ["/categoria", categoryId, productId ] );
    console.log("categoryId:"+ categoryId+ "\n productId:"+ productId);
  }

/**
  //obtener Categorias por sus ID
  categoria:any={};
  getCategoryId(){
    let categoryId = this.activeRoute.snapshot.paramMap.get('categoriaId'); 
    this._categoriasService.getCategoryId(categoryId).subscribe(data =>{   
    this.categoria = data;  
    console.log(this.categoria); 
    })
  }
*/


}
