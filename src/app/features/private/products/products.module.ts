import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductDetailComponent } from './page/product-detail/product-detail.component';
import { SelectableListComponent } from '../../../shared/components/selectable-list/selectable-list.component';
import { ProductsService } from './shared/service/products.service';
import { ProductCardComponent } from './page/products-list/components/product-card/product-card.component';
import { ProductsListComponent } from './page/products-list/products-list.component';

@NgModule({
  declarations: [
    ProductsListComponent,
    ProductsListComponent,
    ProductDetailComponent,
    ProductCardComponent,
  ],
  imports: [
    CommonModule,
    SelectableListComponent,
    ProductsRoutingModule,
  ],
  providers:[ProductsService]
})
export class ProductsModule { }
