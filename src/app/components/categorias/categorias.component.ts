import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from '../../servicios/productos.service';
import { CategoriasService } from '../../servicios/categorias.service';
import { CategoriaProductosService } from '../../servicios/categoriaProductos.service';



@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {

  constructor(private _productosService:ProductosService, 
              private _categoriasService:CategoriasService,
              private _pcService:CategoriaProductosService,
              private activeRoute:ActivatedRoute    ) { }

  ngOnInit(): void {
    this.getCategoryId();
    
    //this.getProducts();
    this.getProductsByCategory();
  }


    

  
  //obtener categoryId 
  categoria:any={};
  getCategoryId(){
    let categoryId = this.activeRoute.snapshot.paramMap.get('categoryId'); //'categoryId' desde la ruta
    this._categoriasService.getCategoryId(categoryId).subscribe(data =>{   
    this.categoria = data;  
    console.log(this.categoria); 
    })
  }


  //Lista de productos
  productos:any=[]; 
  getProducts(){
    this._productosService.getProducts()
    .subscribe(data => {
      this.productos = data;
      console.log(this.productos); 
    });
  } 

  //Lista productos de una categoria ,
  //JOIN con productCategory
  productosByCategory:any=[]; 
  getProductsByCategory(){
    let categoryId = this.activeRoute.snapshot.paramMap.get('categoryId'); //'categoryId' desde la ruta
    this._productosService.getProductsByCategory(categoryId)
    .subscribe(data => {
      this.productosByCategory = data;
      console.log(this.productosByCategory); 
    });
  } 



}
