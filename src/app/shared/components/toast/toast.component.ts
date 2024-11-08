import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
} from '@angular/core';
import { interval, Subscription, tap, timer } from 'rxjs';
import { ToastService } from './services/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  templateUrl: './toast.component.html',
})
export class ToastComponent {
  public timerSubscription: Subscription | null = null;
  private readonly toastSvc = inject(ToastService);
  private readonly TiME_TO_HIDE = 2000;

  constructor() {
    effect(() => {
      if (this.toastSvc.toastList().length && !this.timerSubscription) {
        this.startTimer();
      }else if(!this.toastSvc.toastList().length && this.timerSubscription){
        this.stopTimer();
      }
    });
  }

  get toastList(){
    return this.toastSvc.toastList();
  }

  private stopTimer() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
      this.timerSubscription = null;
    }
  }

  private startTimer() {
    this.timerSubscription = interval(this.TiME_TO_HIDE).subscribe(() =>{
      this.toastSvc.cleanToast()}
    );
  }
}
