import { ChangeDetectionStrategy, Component, EventEmitter, input, Output, Signal } from '@angular/core';
import { Product } from '../../../products/model/product';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [],
  changeDetection:ChangeDetectionStrategy.OnPush,
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.scss'
})
export class CartItemComponent {
  public product = input.required<Product>();
  @Output() removeProduct = new EventEmitter<Product>();

  onRemoveProduct():void{
    this.removeProduct.emit(this.product());
  }

  loger(){
    console.log('render ITEM')
  }
}
