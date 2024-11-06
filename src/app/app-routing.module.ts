import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./features/private/private.module').then((m) => m.PrivateModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{bindToComponentInputs:true})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
