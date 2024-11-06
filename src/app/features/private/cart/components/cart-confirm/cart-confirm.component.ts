import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { timer } from 'rxjs';

@Component({
  selector: 'app-cart-confirm',
  standalone:true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
  templateUrl: './cart-confirm.component.html',
  styleUrl: './cart-confirm.component.scss'
})
export class CartConfirmComponent {

  readonly dialogRef = inject(MatDialogRef<CartConfirmComponent>);
  readonly data = inject<any>(MAT_DIALOG_DATA);
  readonly timerClose = timer(5000).subscribe(() => this.close());
  
  close(): void {
    this.dialogRef.close();
  }
 
  ngOnDestroy(): void {
    this.timerClose.unsubscribe();
  }
}
