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

  //Redireccionar al component categoria con categoryId
  getCategoryId(categoryId:number){    //no pasamos la llave primaria, enviamos las llaves foraneas
    this.router.navigate( ["/categoria", categoryId ] );
    console.log("categoryId:"+ categoryId );
  }





}
