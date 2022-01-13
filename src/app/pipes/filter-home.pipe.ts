import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterHome'
})
export class FilterHomePipe implements PipeTransform {

  transform(arrProductos: any[], arg1:any): any {
    const resltadoPost = [];  // TODO  Array Vacio
    if( arg1.length < 2) return arrProductos;      //la busqueda debe tener por lo menos 3 letras
    if(arrProductos !== undefined ){
      for (const post of arrProductos){ //busqueda post por name, description, price
        if (post.name.toLowerCase().indexOf(arg1.toLowerCase()) > -1  || 
            post.name2.toLowerCase().indexOf(arg1.toLowerCase()) > -1 ||
            post.description.toLowerCase().indexOf(arg1.toLowerCase()) > -1 
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
