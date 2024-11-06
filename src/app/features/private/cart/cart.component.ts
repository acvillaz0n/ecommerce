import { Component, inject } from '@angular/core';
import { CartStore } from '../../../core/store/cart.store';
import { Product } from '../products/model/product';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  public cartStore = inject(CartStore);
  
  public removeFromCart(product: Product):void{
    this.cartStore.removeFromCart(product);
  }
}
