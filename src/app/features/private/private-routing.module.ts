import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrivateComponent } from './private.component';

const routes: Routes = [
  {
    path: '',
    component: PrivateComponent,
    children: [
      {
        path: 'products',
        loadChildren: () =>
          import('./product/products.module').then((m) => m.ProductsModule),
      },
      {
        path: 'cart',
        loadComponent: () =>
          import('./cart/cart.component').then((m) => m.CartComponent),
      },
      {path: '**', redirectTo:'products', pathMatch:'full'}
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrivateRoutingModule {}
