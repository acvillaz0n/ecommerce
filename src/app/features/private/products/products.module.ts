import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductsService } from './service/products.service';
import { SelectableListComponent } from '../../../shared/components/selectable-list/selectable-list.component';
import { ProductCardComponent } from './products-list/components/product-card/product-card.component';

@NgModule({
  declarations: [
    ProductsComponent,
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
