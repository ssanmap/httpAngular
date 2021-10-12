import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product.model';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  productos: Product[] = [];
  limit = 10;
  offset = 0;


  constructor(private productsService:ProductsService) { }

  ngOnInit(): void {
    this.productsService.getProductByPage(10,0)
    .subscribe(data => {
      this.productos = data;
      this.offset += this.limit;
    });
  }

   onLoadMore(){
    this.productsService.getProductByPage(this.limit, this.offset)
      .subscribe(data => {
       this.productos =  this.productos.concat(data);
        this.offset += this.limit;

      })
  }

}
