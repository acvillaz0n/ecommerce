import { Component, inject } from '@angular/core';
import { ProductsService } from '../service/products.service';
import { Product } from '../model/product';
import { CartStore } from '../../../../core/store/cart.store';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss'
})
export class ProductsListComponent {
  private productSvc = inject(ProductsService);
  public cartStore = inject(CartStore);
  public categories$ = this.productSvc.getCategories();
  public products$ = this.productSvc.getProducts();

  public addToCart(product:Product):void{
    console.log(product);
    this.cartStore.addToCart(product);
  }
}
