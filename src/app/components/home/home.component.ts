import { Component, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { DomSanitizer } from "@angular/platform-browser";
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from '../../servicios/productos.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

 //para llamar listado de productos en ngOnInit
  productos:any;


  //pagination
  public page: number=0;

  constructor(private _productosService:ProductosService,
              private router:Router,
              private activeRoute:ActivatedRoute,
              private sanitizer: DomSanitizer ) { }

 
  ngOnInit(): void {
    this.getProducts();
  }

  //lista de productos
  getProducts(){
    this._productosService.getProducts()
    .subscribe(data => {
      this.productos = data;
    });
  } 
  //Redirige al componente PRODUCTOS con su productId y sus llaves foraneas tiendaId,marcaId,tipoProductoId
  getProductId(id:number, tiendaId:number, marcaId:number, tipoProductoId:number){
    this.router.navigate( ["/producto", id, tiendaId, marcaId, tipoProductoId ] );
    console.log(id);
  }


  //metodo para obtener imagen de la base de datos
  public getImgUrl(url : string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

}
