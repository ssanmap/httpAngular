import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

import { Product } from '../../../models/product.model';

import { StoreService } from '../../../services/store.service';
import { ProductsService } from '../../../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent  {

  myShoppingCart: Product[] = [];
  total = 0;
  @Input() products: Product[] = [];
  @Input() 
  set productId(id:string | null) {
    if (id) {
      this.onShowDetail(id);
    }
    }
  @Output() loadMore = new EventEmitter();
  shownProductDetail: boolean = false;

  productChosen: Product = {
    id: '',
    price: 0,
    images: [],
    title: '',
    category: {
      id: '',
      name: ''
    },
    description: ''
  };
 


  constructor(
    private storeService: StoreService,
    private productsService: ProductsService
  ) {
    this.myShoppingCart = this.storeService.getShoppingCart();
  }



  onAddToShoppingCart(product: Product) {
    
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
   // console.log('agregando' + this.total);
  }

  togleProductDetail() {
    this.shownProductDetail = !this.shownProductDetail;
  }
  onShowDetail(id:string) {
    this.productsService.getProduct(id)
      .subscribe(res => {
        if (!this.shownProductDetail) {
          this.shownProductDetail = true;
       }
        this.productChosen = res
      })
  }

  createNewProduct() {

    const product = {
      title: 'New P',
      description: 'asdsa',
      images: [''],
      price: 1000,
      categoryId: 2, 

    }

    this.productsService.create(product)
      .subscribe(data => {
        this.products.unshift(data);
      })
  }

  updateProduct() {
    const changes = {
      title: 'nuevo x',

    }
    const id = this.productChosen.id;
    this.productsService.update(id, changes)
      .subscribe(data => {
        const productIndex = this.products.findIndex(item => item.id === this.productChosen.id)
       // const chosenId = this.productChosen.findIndex(i => i.id )
        this.products[productIndex] = data;
        this.productChosen = data;
       // this.shownProductDetail = false;
      })
  }

  deleteProduct() {
    const id = this.productChosen.id;
    this.productsService.delete(id)
      .subscribe(data => {
        const productIndex = this.products.findIndex(item => item.id === this.productChosen.id)
        this.products.splice(productIndex, 1);
        this.shownProductDetail = false;
      })
  }

  // loadMore() {
  //   this.productsService.getProductByPage(this.limit, this.offset)
  //     .subscribe(data => {
  //      this.products =  this.products.concat(data);
  //       this.offset += this.limit;

  //     })
  // }
  onLoadMore() {
    this.loadMore.emit();
  }

}
