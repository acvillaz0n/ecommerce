import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrivateRoutingModule } from './private-routing.module';
import { PrivateComponent } from './private.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    PrivateComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    PrivateRoutingModule
  ]
})
export class PrivateModule { }
