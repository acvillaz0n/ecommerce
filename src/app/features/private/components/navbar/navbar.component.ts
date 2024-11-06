import { Component, inject } from '@angular/core';
import { CartStore } from '../../../../core/store/cart.store';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  private readonly cartStore = inject(CartStore);

  get totalItems(): number{
    return this.cartStore.totalItems();
  }
}
