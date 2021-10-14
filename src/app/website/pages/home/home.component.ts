import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../services/products.service';
import { Product } from '../../../models/product.model';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  productos: Product[] = [];
  limit = 10;
  offset = 0;
  productId: string | null = null;


  constructor(private productsService: ProductsService,
   private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.productsService.getProductByPage(10,0)
    .subscribe(data => {
      this.productos = data;
      this.offset += this.limit;
    });
    this.route.queryParamMap.subscribe(params => {
      this.productId = params.get('product');
      console.log(this.productId);
    })
  }

   onLoadMore(){
    this.productsService.getProductByPage(this.limit, this.offset)
      .subscribe(data => {
       this.productos =  this.productos.concat(data);
        this.offset += this.limit;

      })
   }
  

}
