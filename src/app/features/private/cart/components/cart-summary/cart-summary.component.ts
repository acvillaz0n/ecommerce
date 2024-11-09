import { Component, inject, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { CartStore } from '@core/store/cart.store';

@Component({
  selector: 'app-cart-summary',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './cart-summary.component.html',
})
export class CartSummaryComponent {
  private readonly PERCENTAGE_IVA: number = 0.21;
  private readonly cartStore = inject(CartStore);
  @Output() confirmOrder: EventEmitter<void> = new EventEmitter<void>();

  get subTotal(){
    return this.cartStore.totalPrice();
  }
  
  get totalProducts(){
    return this.cartStore.totalItems();
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
    this.confirmOrder.emit()
  }
}
