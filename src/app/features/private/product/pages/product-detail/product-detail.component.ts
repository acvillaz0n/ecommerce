import { Component, computed, inject, input, InputSignal, Signal } from '@angular/core';
import { Observable } from 'rxjs';
import { CartStore } from '@core/store/cart.store';
import { ToastService } from '@shared/components/toast/services/toast.service';
import { Product } from '../../shared/models/product';
import { ProductsService } from '../../shared/services/products.service';
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
})
export class ProductDetailComponent {
  public readonly productId: InputSignal<number> = input.required();
  public readonly productSvc: ProductsService = inject(ProductsService);
  public readonly toastSvc: ToastService = inject(ToastService);
  public product$: Signal<Observable<Product>> = computed(() => this.productSvc.getProduct(this.productId()));
  private readonly cartStore = inject(CartStore);

  public addToCar(product: Product): void{
    this.cartStore.addToCart(product);
    this.toastSvc.buildToast('Product added to cart')
  }
}
