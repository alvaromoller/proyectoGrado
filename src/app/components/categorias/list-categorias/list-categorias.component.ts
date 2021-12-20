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
    this.getProductCategories();    //tabla NxN productCategory
    this.getCategories();           
  }


  //lista de categorias, nombres
  categorias:any;
  getCategories(){
    this._categoriasService.getCategories()
    .subscribe(data => {
      this.categorias = data;
    });
  } 


  //Tabla NxN, lista de ProductCategory , 
  // para el button
  productoCategorias:any;
  getProductCategories(){
    this._pcService.getPc()
    .subscribe(data => {
      this.productoCategorias = data;
    });
  } 


  //Tabla NxN productCategory, redirigir al component Category con su llave primaria y su categoryId 
   //sus llaves foraneas llamaran a variables de product y category
  getPcId(pcId:number, categoryId:number){    //no pasamos la llave primaria, enviamos las llaves foraneas
    this.router.navigate( ["/categoria", pcId, categoryId ] );
    console.log("categoryId:"+ pcId+ "\n productId:"+ categoryId );
  }



}
