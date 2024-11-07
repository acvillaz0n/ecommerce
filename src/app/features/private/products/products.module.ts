import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductDetailComponent } from './page/product-detail/product-detail.component';
import { ProductCardComponent } from './page/products-list/components/product-card/product-card.component';
import { ProductsListComponent } from './page/products-list/products-list.component';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductsService } from './shared/service/products.service';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [
    ProductsListComponent,
    ProductDetailComponent,
    ProductCardComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ProductsRoutingModule,
  ],
  providers:[ProductsService]
})
export class ProductsModule { }
