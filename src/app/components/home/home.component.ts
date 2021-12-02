import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from "@angular/platform-browser"
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
 constructor( private _productosService:ProductosService, 
              private router:Router,
              private sanitizer: DomSanitizer ) { }

 
  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(){
    this._productosService.getProducts()
    .subscribe(data => {
      this.productos = data;
    });
  } 

  //Redirige al componente PRODUCTOS con su ID
  getProductId(id:number){
    this.router.navigate( ["/producto", id] );
    console.log(id);
  }


  //metodo para obtener imagen de la base de datos
  public getImgUrl(url : string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

}
