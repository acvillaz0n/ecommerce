import { Component, inject } from '@angular/core';
import { CartStore } from '@core/store/cart.store';
import { Observable } from 'rxjs';
import { ToastService } from '@shared/components/toast/services/toast.service';
import { Product } from '../../shared/models/product';
import { ProductsService } from '../../shared/services/products.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss'
})
export class ProductsListComponent {
  private readonly productSvc: ProductsService = inject(ProductsService);
  public products$: Observable<Product[]> = this.productSvc.getProducts();
  
  private readonly cartStore = inject(CartStore);
  private readonly toastSvc = inject(ToastService);

  public addToCart(product:Product):void{
    this.cartStore.addToCart(product);
    this.toastSvc.buildToast('Product added to cart')
  }
}
