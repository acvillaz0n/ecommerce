import { Component, inject } from '@angular/core';
import { CartStore } from '../../../../../core/store/cart.store';
import { Product } from '../../shared/model/product';
import { ProductsService } from '../../shared/service/products.service';

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
