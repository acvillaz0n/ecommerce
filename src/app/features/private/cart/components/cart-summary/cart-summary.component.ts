import { Component, inject, Output, EventEmitter } from '@angular/core';
import { CartStore } from '../../../../../core/store/cart.store';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-cart-summary',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './cart-summary.component.html',
  styleUrl: './cart-summary.component.scss'
})
export class CartSummaryComponent {
  private PERCENTAGE_IVA: number = 0.21;
  private cartStore = inject(CartStore);
  @Output() confirmOrder = new EventEmitter<boolean>();

  get subTotal(){
    return this.cartStore.totalPrice();
  }

  get buildIva(): number{
    return this.cartStore.totalPrice() * this.PERCENTAGE_IVA;
  }

  get shippingPrice(): number{
    return 5.99;
  }

  get totalPrice(): number{
    return this.cartStore.totalPrice() + this.buildIva + this.shippingPrice;
  }

  public payCart(){
    this.confirmOrder.emit(true)
  }
}
