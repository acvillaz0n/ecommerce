import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CartConfirmComponent } from './components/cart-confirm/cart-confirm.component';
import { CartItemComponent } from './components/cart-item/cart-item.component';
import { CartSummaryComponent } from './components/cart-summary/cart-summary.component';
import { CartStore } from '@core/store/cart.store';
import { Product } from '../products/shared/model/product';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CartItemComponent, CartSummaryComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  private readonly dialog: MatDialog = inject(MatDialog);
  readonly cartStore = inject(CartStore);

  public removeFromCart(product: Product): void {
    this.cartStore.removeFromCart(product);
  }

  public confirmOrder(): void {
    const cartConfirmRef = this.dialog.open(CartConfirmComponent);

    cartConfirmRef.afterClosed().subscribe(() => {
      this.cartStore.cleanStore();
    });
  }
}
