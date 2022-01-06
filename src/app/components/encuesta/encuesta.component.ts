import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from "@angular/platform-browser";
import { ProductosService } from '../../servicios/productos.service';
import { ProductosComponent } from '../../components/productos/productos.component';
import { Productos } from '../../components/productos/productos';
import { MatDialog } from '@angular/material/dialog';



@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.css']
})
export class EncuestaComponent implements OnInit {

  //Filter, para las busquedas
  filterPost: string[] = [];
  
  constructor(private _productosService:ProductosService,
              private sanitizer: DomSanitizer,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getProducts();
  }

  //lista de productos
  productos:any;
  getProducts(){
    this._productosService.getProducts()
    .subscribe(data => {
      this.productos = data;
    });
  } 

  //metodo para obtener imagen de la base de datos
  public getImgUrl(url : string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }


  /////////////////////////////////////////////////////////////////////////////////////
  //nueva metodo ventana emergente
  //metodo para ver inf. de nuestro producto
  productInfo(product: Productos) {
    this._productosService.setLast(product);
    const dialogRef = this.dialog.open(ProductosComponent,{
      width: '1040px',height:'550px',disableClose: true 
    });
  }  
/////////////////////////////////////////////////////////////////////////////////////


  /////////////////////////////////
  ModifyFilter(filter:any, checked:any) {
    if (checked) {
      this.filterPost.push(filter);
    }
    else {
      this.filterPost.splice(this.filterPost.indexOf(filter), 1)
    }
    this.filterPost = [...this.filterPost]
  }
  /////////////////////////////////


}
