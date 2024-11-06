import { Component, inject } from '@angular/core';
import { CartStore } from '../../../core/store/cart.store';
import { Product } from '../products/shared/model/product';
import { MatDialog } from '@angular/material/dialog';
import { CartConfirmComponent } from './components/cart-confirm/cart-confirm.component';
import { CartItemComponent } from './components/cart-item/cart-item.component';
import { CartSummaryComponent } from './components/cart-summary/cart-summary.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CartItemComponent, CartSummaryComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  readonly cartStore = inject(CartStore);
  readonly dialog = inject(MatDialog);

  public removeFromCart(product: Product): void {
    this.cartStore.removeFromCart(product);
  }

  confirmOrder(): void {
    const dialogRef = this.dialog.open(CartConfirmComponent);

    dialogRef.afterClosed().subscribe(() => {
      this.cartStore.cleanStore();
    });
  }
}
