import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { CartComponent } from './cart.component';
import { CartItemComponent } from './components/cart-item/cart-item.component';
import { CartSummaryComponent } from './components/cart-summary/cart-summary.component';


@NgModule({
  declarations: [
    CartComponent
  ],
  imports: [
    CommonModule,
    CartItemComponent,
    CartSummaryComponent,
    CartRoutingModule
  ]
})
export class CartModule { }
