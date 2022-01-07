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
  filterPost: any= [];

  constructor(private _productosService:ProductosService,
              private sanitizer: DomSanitizer,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getProducts();
  }

  //lista de productos
  productos:any;
  productos2:any;
  getProducts(){
    this._productosService.getProducts()
    .subscribe(data => {
      this.productos = data;
      //console.log("Productos"); 
      //console.log(this.productos);
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
//PROBANDO Multi filter 
checkbox: any = [
  { id: 1, type:"checkbox",  price: 1000 },
  { id: 2, type:"checkbox",  price: 2000 },
  { id: 3, type:"checkbox",  price: 3000 },
  { id: 4, type:"checkbox",  price: 4000 }
];


//PROBANDO Multi filter 
items: any = [
  { id: 1, price: 1000 },
  { id: 2, price: 2000 },
  { id: 3, price: 3000 },
  { id: 4, price: 4000 },
  { id: 5, price: 4000 }
];
array1 = this.items;
array2 = this.items;


//
filter1: any= [];
newfilter2: any= [];
ModifyFilter(event:any) {
  //console.log("metodo ModifyFilter: "+ event.target.checked); //al marcar el input muestra True, al desmarcar el input muestra un false
  //console.log("contenido del array2");
  //console.log(this.array2);                                   //verificamos que el array2 esta jalando datos de items[]

  if(event.target.checked){             // si se marca una caja realiza la condicion
    console.log(event.target.value);    // obtiene el caja.ID del arreglo checkbox
    this.filter1 = this.array2.filter((e:any) => e.id == event.target.value )            // si el item.ID == caja.ID mostrar el arreglo item{id,precio}
    //console.log(this.filter1);           // obtiene el id y precio del arreglo Items


    this.array1 =[];                      // se utiliza en linea 109
    this.newfilter2.push(this.filter1);   // captura los checkbox que se seleccionan
    //console.log(this.newfilter2);         // muestra los checkbox en un solo arreglo


    for(let i=0; i < this.newfilter2.length; i++){    //recorrido de todos los checkbox seleccionados
      var auxArray = this.newfilter2[i];              // guardamos en un auxArray
      //console.log(auxArray);                          // muestra los items en arreglos separados []
    
      for(let i=0; i < auxArray.length; i++){
        var auxArray2 = auxArray[i];
        //console.log(auxArray2);                     //muestra los items en arreglos separados {}
        this.array1.push(auxArray2);                  //captura y muestra en el frontend los checkbox que se seleccionan
        console.log(this.array1);                     //muestra los items en arreglos separados {}
      }
    }

  }
  else{

  }

}

/////////////////////////////////


}
