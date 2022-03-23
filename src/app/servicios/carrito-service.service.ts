import { Injectable } from '@angular/core';
import { Productos } from '../components/productos/productos';

@Injectable({
  providedIn: 'root'
})

export class CarritoServiceService {

  products:Productos[]=[];
  //cantidad de productos
  productsCantidad:any[] = [];
  total: number = 0;
  constructor() { }

  // CANTIDAD DE PRODUCTO/////////////////////////////////////////////////////////

  //añadir productos
  addProduct(product: Productos){
   // this.products.push(product);
   let posicion = this.verificarProductoDuplicado(product);
      if(posicion == -1){
        this.productsCantidad.push({
          producto: product,
          cantidad: 1
          }) 
          console.log("Producto NO duplicado:");
          console.log(product);  
      }else{
        this.productsCantidad[posicion].cantidad+=1
        console.log("Producto duplicado:");
        console.log(product); 
      }
     
  }

  //obteniendo cantidad para el carrito
  getProductsCantidad():any[]{
    return this.productsCantidad;
  }

  //añadir Producto Duplicados
  verificarProductoDuplicado(product: Productos){
      let posicion = -1;
      for(let i=0; i<this.productsCantidad.length; i++){
         // let productoRegistrado:any = this.productsCantidad[i]["producto"];
          if( this.productsCantidad[i].producto.productId == product.productId){
            posicion = i;
            break;    
          }
      }
      return posicion;
  }

///////////////////////////////////////////////////////////
  //obteniendo productos para el carrito
  getProducts():Productos[]{
    return this.products;
  }


  //Eliminar producto
  deleteProduct(product: Productos){
    let temp:any[]=[];
    for (let x of this.productsCantidad){
      if (x.producto.productId != product.productId){
        temp.push(x);
      }
    }
    this.productsCantidad = temp;
  }

  //obtener el precio total de los productos
  getTotal():number{
    this.total = 0;
    for (let product of this.productsCantidad){
      this.total+=product.producto.price * product.cantidad;
      console.log("Precio Total:");
      console.log(product.price);
    }
    return this.total;
  }

  
}
