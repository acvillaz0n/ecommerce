import { Component, inject } from '@angular/core';
import { MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-cart-confirm',
  standalone:true,
  imports: [
    MatDialogContent,
    MatDialogTitle
  ],
  templateUrl: './cart-confirm.component.html',
})
export class CartConfirmComponent {
  private TiME_TO_HIDE = 3000;
  private readonly dialogRef: MatDialogRef<CartConfirmComponent> = inject(MatDialogRef<CartConfirmComponent>);
  private readonly timerClose: Subscription = timer(this.TiME_TO_HIDE).subscribe(() => this.close());
  
  public close(): void {
    this.dialogRef.close();
  }
 
  ngOnDestroy(): void {
    this.timerClose?.unsubscribe();
  }
}
