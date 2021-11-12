import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../../servicios/productos.service';
import { Productos } from '../productos/productos';
import { ActivatedRoute } from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';




@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  //productos:any;
  constructor(private _productosService:ProductosService, private activeRoute:ActivatedRoute ) {
   }

  ngOnInit(): void {
    console.log("productoAny desde Constructor");
    this.getProductId();
  }


  

     /**ESTRUCTURA DE info Product*/
     productos:any;
     productForm = new FormGroup({
         productId: new FormControl(''),
         name: new FormControl(''),
         description: new FormControl(''),
         img: new FormControl(''),
         brandId: new FormControl(''),
         shopId: new FormControl(''),
         productTypeId: new FormControl(''),
     });

  //probar   getProductId(id:any)
  getProductId(){
    let producotId = this.activeRoute.snapshot.paramMap.get('id'); 
    this._productosService.getProductId(producotId).subscribe(data =>{   
    this.productos = data;  

      //
      this.productForm.setValue({
      'productId': this.productos.productId,
      'name': this.productos.name,
      'description': this.productos.description,
      'img': this.productos.img,
      'brandId': this.productos.brandId,
      'shopId': this.productos.shopId,
      'productTypeId': this.productos.productTypeId,
      })   
      console.log(this.productForm.value); 
      

    })

  }



}
