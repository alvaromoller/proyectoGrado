import { Pipe, PipeTransform } from '@angular/core';

export interface TablaProductos{
  productId: number,
  name: string,
  description: string
}
@Pipe({
  name: 'filter'
})

export class FilterPipe implements PipeTransform {
  // public arrProductos = new Array<TablaProductos>(); 
  transform(arrProductos: any[], arg: any): any {
    const resltadoPost = [];  // TODO Sergio Array Vacio
    if(arrProductos !== undefined){
      for (const post of arrProductos){
        if (post.name.toLowerCase().indexOf(arg.toLowerCase()) > -1 ){
            console.log("SI");
            resltadoPost.push(post); 
        }
      }
    }
    return resltadoPost; // TODO Sergio Retorna el arrat con las coincidencias
  }
}

