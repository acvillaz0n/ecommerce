import { Component, inject } from '@angular/core';
import { CartStore } from '../../../core/store/cart.store';
import { Product } from '../products/model/product';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  private PERCENTAGE_IVA: number = 0.21;
  public cartStore = inject(CartStore);

  get buildIva(): number{
    return this.cartStore.totalPrice() * this.PERCENTAGE_IVA;
  }

  get shippingPrice(): number{
    return 5.99;
  }

  get totalPrice(): number{
    return this.cartStore.totalPrice() + this.buildIva + this.shippingPrice;
  }

  public removeFromCart(product: Product):void{
    this.cartStore.removeFromCart(product);
  }
}
