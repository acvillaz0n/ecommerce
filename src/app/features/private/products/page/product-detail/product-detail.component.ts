import { Component, computed, inject, input, InputSignal, Signal } from '@angular/core';
import { Product } from '../../shared/model/product';
import { Observable } from 'rxjs';
import { CartStore } from '../../../../../core/store/cart.store';
import { ProductsService } from '../../shared/service/products.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent {
  public productId:InputSignal<number> = input.required();
  private productSvc = inject(ProductsService);
  private cartStore = inject(CartStore);
  public product$:Signal<Observable<Product>> = computed(() => this.productSvc.getProduct(this.productId()));

  public addToCar(product: Product): void{
    this.cartStore.addToCart(product);
  }
}
