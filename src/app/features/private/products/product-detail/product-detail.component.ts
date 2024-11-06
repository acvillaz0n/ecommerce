import { Component, computed, inject, input, InputSignal, Signal } from '@angular/core';
import { ProductsService } from '../service/products.service';
import { Product } from '../model/product';
import { Observable } from 'rxjs';
import { CartStore } from '../../../../core/store/cart.store';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent {
  public id:InputSignal<number> = input.required();
  private productSvc = inject(ProductsService);
  private cartStore = inject(CartStore);
  public product$:Signal<Observable<Product>> = computed(() => this.productSvc.getProduct(this.id()));

  public addToCar(product: Product): void{
    this.cartStore.addToCart(product);
  }
}
