import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { ProductCardComponent } from './pages/products-list/components/product-card/product-card.component';
import { ProductsListComponent } from './pages/products-list/products-list.component';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductsService } from './shared/services/products.service';

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
