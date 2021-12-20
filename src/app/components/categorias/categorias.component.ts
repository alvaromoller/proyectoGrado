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
    this.getPcId();
    
    this.getProducts();
  }


    
  //Tabla NxN, ProductCategory, obtener productCategoryId 
  pc:any={};
  getPcId(){
    let pcId = this.activeRoute.snapshot.paramMap.get('pcId'); //'categoryId' desde la ruta
    this._pcService.getPcId(pcId).subscribe(data =>{   
    this.pc = data;  
    console.log(this.pc); 
    })
  }

  
  //Tabla NxN, ProductCategory, obtener categoryId 
  categoria:any={};
  getCategoryId(){
    let categoryId = this.activeRoute.snapshot.paramMap.get('categoryId'); //'categoryId' desde la ruta
    this._categoriasService.getCategoryId(categoryId).subscribe(data =>{   
    this.categoria = data;  
    console.log(this.categoria); 
    })
  }

  

  //Tabla NxN, ProductCategory, obtener lista de productos
  productos:any=[]; 
  getProducts(){
    this._productosService.getProducts()
    .subscribe(data => {
      this.productos = data;
      console.log(this.productos); 
    });
  } 


  //se creo nuevo metodo para ordenar la ejecucion de los Servicios
  /**
  async getData(){
    //product
    await this._productosService.getProducts().toPromise().then
    (data => {
      this.productos = data;
    });
    console.log(this.productos); 
    //category
    let categoryId = this.activeRoute.snapshot.paramMap.get('categoryId'); //'categoryId' desde la ruta
    await this._categoriasService.getCategoryId(categoryId).toPromise().then
    (data =>{   
      this.categoria = data;  
    console.log(this.categoria); 
    })
    //ProductCategory
    let pcId = this.activeRoute.snapshot.paramMap.get('pcId'); //'categoryId' desde la ruta
    await this._pcService.getPcId(pcId).toPromise().then
    (data =>{   
      this.pc = data;  
    console.log(this.pc); 
    })

    let productosAux = [];
    
    for( let i=0; i < this.pc.length(); i++ ){
      let pcAux = this.pc[i];
      if( pcAux.categoryId == categoryId ){
        let pcProductId = pcAux.productId; 
        //this.productos.find(prod  => prod.productId == pcProductId);
      }
    } 
     
    console.log("es sincrono erickin?")
  }
*/
 

}
