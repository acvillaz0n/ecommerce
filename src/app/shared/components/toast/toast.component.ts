import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  EventEmitter,
  inject,
  input,
  Input,
  InputSignal,
  Output,
  signal,
  WritableSignal,
} from '@angular/core';
import { interval, Subscription, tap, timer } from 'rxjs';
import { ToastService } from './services/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss',
})
export class ToastComponent {
  private readonly toastSvc = inject(ToastService);
  private TiME_TO_HIDE = 2000;
  private timerSubscription: Subscription | null = null;

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
