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
  filterBrand:any=[];       // Marca
  filterRam:any=[];         // Memoria Ram
  filterProcessor:any=[];   // Procesador  
  filterStorage:any=[];     // almacenamiento, SSD, TB

  constructor(private _productosService:ProductosService,
              private sanitizer: DomSanitizer,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getProducts();

  }

  //lista de productos
  productos:any = [];
  productos2:any = [];
  getProducts(){
    this._productosService.getProducts()
    .subscribe(data => {
      this.productos = data;
      this.productos2 = data;
      //console.log(this.productos); 
      //console.log(this.productos2);
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



  //////////////////////////////////////////////
  //PROBANDO Multi filter 
  checkbox: any = [
    { id: 1, type:"checkbox", brand:"HP",     ram:"4 GB"  , price: 1000 },
    { id: 2, type:"checkbox", brand:"DELL",   ram:"8 GB"  , price: 2000 },
    { id: 3, type:"checkbox", brand:"Lenovo", ram:"12 GB" , price: 3000 },
    { id: 4, type:"checkbox", brand:"Asus",   ram:"16 GB" , price: 4000 }
  ];

  //////////////////////////////////////////////



  

}
