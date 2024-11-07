import { ChangeDetectionStrategy, Component, EventEmitter, input, InputSignal, Output, Signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Product } from '../../../products/shared/model/product';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [CurrencyPipe],
  changeDetection:ChangeDetectionStrategy.OnPush,
  templateUrl: './cart-item.component.html',
})
export class CartItemComponent {
  public readonly product: InputSignal<Product> = input.required<Product>();
  @Output() removeProduct: EventEmitter<Product> = new EventEmitter<Product>();

  public removeFromCart():void{
    this.removeProduct.emit(this.product());
  }
}
