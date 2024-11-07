import { Component, inject } from '@angular/core';
import { CartStore } from '@core/store/cart.store';
import { Observable } from 'rxjs';
import { Product } from '../../shared/model/product';
import { ProductsService } from '../../shared/service/products.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss'
})
export class ProductsListComponent {
  private readonly productSvc: ProductsService = inject(ProductsService);
  private readonly cartStore = inject(CartStore);
  public categories$: Observable<string[]> = this.productSvc.getCategories();
  public products$: Observable<Product[]> = this.productSvc.getProducts();

  public addToCart(product:Product):void{
    this.cartStore.addToCart(product);
  }
}
