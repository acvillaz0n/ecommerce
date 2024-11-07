import { Component, inject } from '@angular/core';
import { MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { timer } from 'rxjs';

@Component({
  selector: 'app-cart-confirm',
  standalone:true,
  imports: [
    MatDialogContent,
  ],
  templateUrl: './cart-confirm.component.html',
})
export class CartConfirmComponent {
  private TiME_TO_HIDE = 3000;
  readonly dialogRef = inject(MatDialogRef<CartConfirmComponent>);
  readonly timerClose = timer(this.TiME_TO_HIDE).subscribe(() => this.close());
  
  close(): void {
    this.dialogRef.close();
  }
 
  ngOnDestroy(): void {
    this.timerClose.unsubscribe();
  }
}
