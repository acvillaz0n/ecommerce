import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailComponent } from './page/product-detail/product-detail.component';
import { ProductsListComponent } from './page/products-list/products-list.component';

const routes: Routes = [
  { path: '', component: ProductsListComponent },
  { path: ':productId', component: ProductDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}
