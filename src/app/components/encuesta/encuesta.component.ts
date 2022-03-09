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
  filtertarjetaGrafica:any=[]; //tarjeta grafica

  constructor(private _productosService:ProductosService,
              private sanitizer: DomSanitizer,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getProducts();

    this.getDescription();
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
    { id: 1, type:"checkbox", info:"Memoria Ram" ,   price: 2000 },
    { id: 2, type:"checkbox", info:"Procesador"  ,   price: 3000 },
    { id: 3, type:"checkbox", info:"Almacenamiento", price: 4000 },
    { id: 4, type:"checkbox", info:"Tarjeta Gráfica", price: 4000 }
  ];

  
  descriptions: any = [
    { id: 1, info:"Memoria Ram" ,   description:"Por norma general, y salvo que vayas a utilizar el portátil para fines profesionales o de edición, la cifra de memoria RAM que debes buscar son 8 GB. Hoy en día 4 GB van a resultarte insuficientes, así que ni te lo plantees, y 16 GB pueden estar bien si vas a usar el equipo con tareas pesadas y para gaming, pero de nuevo, 8 GB es una cifra válida para la gran mayoría de usuarios."  , price: 2000 },
    { id: 2, info:"Procesador"  ,   description:"Esto es la central de operaciones, el corazón de la laptop. Es lo que permitiría que el equipo funcione con rapidez o no cuando se realizan diferentes tareas. En este sentido hay que prestar atención a la cantidad de núcleos que tenga. Cuantos más haya mejor. En este sentido, en principio un quad core (cuatro núcleos) es mejor que un dual core (dos núcleos)." , price: 3000 },
    { id: 3, info:"Almacenamiento", description:"Hoy en día no tiene mucho sentido comprar un portátil que no tenga SSD, por lo que la recomendación es que si el portátil tiene un disco duro convencional, no te plantees su compra porque vas a notar que va lento desde el primer día. Incluso aquellos portátiles con SSD SATA 3 van a proporcionarte un rendimiento y unos tiempos de encendido muchísimo mejores, así que la recomendación aquí es que busques siempre opciones que tengan SSD." , price: 4000 },
    { id: 4, info:"Tarjeta Gráfica",description:"Dependiendo de para qué vayas a utilizar el portátil, la gráfica dedicada puede ser importante o no. Obviamente si quieres usar el portátil para jugar necesitarás buscar una gráfica dedicada AMD o NVIDIA en tu portátil, lo cual aumentará considerablemente su precio. Pero si no es tu caso, con la gráfica integrada que venga en el procesador tendrás suficiente para casi todo, incluso para juegos sencillos si pretendes jugar de manera esporádica." , price: 4000 }
  ];
  array1:any = [];
  array2:any = [];
  getDescription(){
    this.array1 = this.descriptions;
    this.array2 = this.descriptions;
  }

  //Comparacion con description
  filter1: any= [];
  newfilter2: any= []; 
  ModifyFilterDescription(event:any) {    
    if(event.target.checked){             // si se marca una caja realiza la condicion
      console.log(event.target.value);    // obtiene el caja.marca del arreglo checkbox para comparar
      this.filter1 = this.array2.filter((e:any) => e.id == event.target.value )            // si el productos2.marca == caja.marca mostrar el arreglo item{id,marca}
      //console.log(this.array1);           // obtiene el id  del arreglo Items

      this.array1 =[];                      // 
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
          //console.log(this.productos);                     //muestra los items en arreglos separados {}
        }//For
      }//For

    }
  }
  //////////////////////////////////////////////



  

}
