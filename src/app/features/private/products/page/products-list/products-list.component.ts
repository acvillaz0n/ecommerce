import { Component, inject } from '@angular/core';
import { CartStore } from '@core/store/cart.store';
import { Observable } from 'rxjs';
import { Product } from '../../shared/model/product';
import { ProductsService } from '../../shared/service/products.service';
import { ToastService } from '@shared/components/toast/services/toast.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss'
})
export class ProductsListComponent {
  private readonly productSvc: ProductsService = inject(ProductsService);
  public categories$: Observable<string[]> = this.productSvc.getCategories();
  public products$: Observable<Product[]> = this.productSvc.getProducts();
  
  private readonly cartStore = inject(CartStore);
  private readonly toastSvc = inject(ToastService);

  public addToCart(product:Product):void{
    this.cartStore.addToCart(product);
    this.toastSvc.buildToast('Product added to cart')
  }
}
