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

    //probando encuesta
    this.getItem();
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










  ///////////////////////////////////
  //PROBANDO Multi filter 
  //Arreglo de cajas, Chechbox
  checkbox: any = [
    { id: 1, type:"checkbox", brand:"HP",     price: 1000 },
    { id: 2, type:"checkbox", brand:"DELL",   price: 2000 },
    { id: 3, type:"checkbox", brand:"Lenovo", price: 3000 },
    { id: 4, type:"checkbox", brand:"Asus",   price: 4000 }
  ];

  //Arreglo de items 
  items: any = [
    { id: 1, price: 1000 },
    { id: 2, price: 2000 },
    { id: 3, price: 3000 },
    { id: 4, price: 4000 },
    { id: 4, price: 4000 }
  ];


  array1:any=[];
  array2:any=[];
  getItem(){
    this.array1 = this.items;
    this.array2 = this.items;
    //console.log(this.array1);
    //console.log(this.array2);
  }

  filter1: any= [];
  newfilter2: any= [];
  ModifyFilter(event:any) {
    //console.log("metodo ModifyFilter: "+ event.target.checked); //al marcar el input muestra True, al desmarcar el input muestra un false
    
    if(event.target.checked){             // si se marca una caja realiza la condicion
      console.log(event.target.value);    // obtiene el caja.ID del arreglo checkbox
      this.filter1 = this.array2.filter((e:any) => e.id == event.target.value )            // si el item.ID == caja.ID mostrar el arreglo item{id,precio}
      //console.log(this.filter1);           // obtiene el id y precio del arreglo Items

      this.array1 =[];                      // se utiliza en linea 116
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
        }//For
      }//For

    }
    else{
      this.filter1 = this.array1.filter((e:any) => e.id != event.target.value )            // si el item.ID == caja.ID mostrar el arreglo item{id,precio}
      this.newfilter2 = [];
      this.array1 = [];
      this.newfilter2.push(this.filter1);
      //console.log(this.filter1);      // al desmarcar un checkbox debe desaparecer el dato obtenido

      for(let i=0; i < this.newfilter2.length; i++){    //recorrido de todos los checkbox seleccionados
        var auxArray = this.newfilter2[i];              // guardamos en un auxArray
        //console.log(auxArray);                          // muestra los items en arreglos separados []
      
        for(let i=0; i < auxArray.length; i++){
          var auxArray2 = auxArray[i];
          //console.log(auxArray2);                     //muestra los items en arreglos separados {}
          this.array1.push(auxArray2);                  //captura y muestra en el frontend los checkbox que se seleccionan
          //console.log(this.array1);                     //muestra los items en arreglos separados {}
        }//For
      }//For

    }
  }
  /////////////////////////////////




  /////////////////////////////////
  //probando metodo encuesta con productos
  ModifyFilterProducts(event:any) {    
    if(event.target.checked){             // si se marca una caja realiza la condicion
      console.log(event.target.value);    // obtiene el caja.marca del arreglo checkbox para comparar
      this.filter1 = this.productos2.filter((e:any) => e.brand == event.target.value )            // si el productos2.marca == caja.marca mostrar el arreglo item{id,marca}
      //console.log(this.filter1);           // obtiene el id y precio del arreglo Items

      this.productos =[];                      // se utiliza en linea 116
      this.newfilter2.push(this.filter1);   // captura los checkbox que se seleccionan
      //console.log(this.newfilter2);         // muestra los checkbox en un solo arreglo

      for(let i=0; i < this.newfilter2.length; i++){    //recorrido de todos los checkbox seleccionados
        var auxArray = this.newfilter2[i];              // guardamos en un auxArray
        //console.log(auxArray);                          // muestra los items en arreglos separados []
      
        for(let i=0; i < auxArray.length; i++){
          var auxArray2 = auxArray[i];
          //console.log(auxArray2);                     //muestra los items en arreglos separados {}
          this.productos.push(auxArray2);                  //captura y muestra en el frontend los checkbox que se seleccionan
          console.log(this.productos);                     //muestra los items en arreglos separados {}
        }//For
      }//For

    }
    else{
      this.filter1 = this.productos.filter((e:any) => e.brand != event.target.value )            // si el item.ID == caja.ID mostrar el arreglo item{id,precio}
      this.newfilter2 = [];
      this.productos = [];
      this.newfilter2.push(this.filter1);
      //console.log(this.filter1);      // al desmarcar un checkbox debe desaparecer el dato obtenido

      for(let i=0; i < this.newfilter2.length; i++){    //recorrido de todos los checkbox seleccionados
        var auxArray = this.newfilter2[i];              // guardamos en un auxArray
        //console.log(auxArray);                          // muestra los items en arreglos separados []
      
        for(let i=0; i < auxArray.length; i++){
          var auxArray2 = auxArray[i];
          //console.log(auxArray2);                     //muestra los items en arreglos separados {}
          this.productos.push(auxArray2);                  //captura y muestra en el frontend los checkbox que se seleccionan
          //console.log(this.productos);                     //muestra los items en arreglos separados {}
        }//For
      }//For

    }
  }


}
