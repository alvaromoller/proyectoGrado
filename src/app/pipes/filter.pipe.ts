import { Pipe, PipeTransform } from '@angular/core';

export interface TablaProductos{
  productId: number,
  name: string,
  name2: string,
  description: string,
  price: number
}
@Pipe({
  name: 'filter'
})

export class FilterPipe implements PipeTransform {

  //public arrProductos = new Array<TablaProductos>(); 
  //post.price.indexOf(arg) > -1
  
  transform(arrProductos: any[], arg: any): any {
    const resltadoPost = [];  // TODO  Array Vacio
    if( arg.length < 2) return arrProductos;      //la busqueda debe tener por lo menos 3 letras
    if(arrProductos !== undefined ){
      for (const post of arrProductos){ //busqueda post por name, description, price
        if (post.name.toLowerCase().indexOf(arg.toLowerCase()) > -1  || 
            post.name2.toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
            post.description.toLowerCase().indexOf(arg.toLowerCase()) > -1 
           ) {

            console.log("SI");
            //console.log(post);
            resltadoPost.push(post); 
        }
      }
    }
    return resltadoPost; // TODO  Retorna el array con las coincidencias
  }

  
}

