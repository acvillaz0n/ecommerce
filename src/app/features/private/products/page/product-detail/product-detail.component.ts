import { Component, computed, inject, input, InputSignal, Signal } from '@angular/core';
import { Product } from '../../shared/model/product';
import { Observable } from 'rxjs';
import { CartStore } from '../../../../../core/store/cart.store';
import { ProductsService } from '../../shared/service/products.service';
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
})
export class ProductDetailComponent {
  public productId:InputSignal<number> = input.required();

  public readonly productSvc:ProductsService = inject(ProductsService);
  public product$:Signal<Observable<Product>> = computed(() => this.productSvc.getProduct(this.productId()));
  
  private cartStore = inject(CartStore);

  public addToCar(product: Product): void{
    this.cartStore.addToCart(product);
  }
}
