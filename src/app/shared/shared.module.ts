import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectableListComponent } from './components/selectable-list/selectable-list.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SelectableListComponent
  ],
  exports:[SelectableListComponent]
})
export class SharedModule { }
