import { ChangeDetectionStrategy, Component, EventEmitter, input, InputSignal, Output, Signal } from '@angular/core';
import { Product } from '../../../products/shared/model/product';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [CurrencyPipe],
  changeDetection:ChangeDetectionStrategy.OnPush,
  templateUrl: './cart-item.component.html',
})
export class CartItemComponent {
  public product: InputSignal<Product> = input.required<Product>();
  @Output() removeProduct = new EventEmitter<Product>();

  removeFromCart():void{
    this.removeProduct.emit(this.product());
  }

  loger(){
    console.log('render ITEM')
  }
}
