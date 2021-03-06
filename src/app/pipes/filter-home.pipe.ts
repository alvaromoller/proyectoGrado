import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterHome'
})
export class FilterHomePipe implements PipeTransform {

  transform(arrProductos: any[], arg1:any): any {
    const resltadoPost = [];  // TODO  Array Vacio

    if( arg1.length < 2) 
    return arrProductos;                      //la busqueda debe tener por lo menos 2 letras

    if(arrProductos !== undefined )           //si es distinto a nidefinido q realice las sgtes busquedas
    {
      for (const post of arrProductos)
      { //busqueda post por name1,name2 y description
        if(post.name.toLowerCase().indexOf(arg1.toLowerCase()) > -1  || 
           post.name2.toLowerCase().indexOf(arg1.toLowerCase()) > -1 ||
           post.description.toLowerCase().indexOf(arg1.toLowerCase()) > -1 )
        {
          console.log("SI");
          //console.log(post);
          resltadoPost.push(post); 
        }


      }//for
    }//if

    return resltadoPost; // TODO  Retorna el array con las coincidencias
  }


}
