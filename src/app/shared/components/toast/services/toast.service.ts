import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn:'root'
})
export class ToastService {
  public toastList: WritableSignal<String[]> = signal([]);

  public buildToast(message: string): void{
    this.toastList.update((toastList) => [...toastList,message])
  }

  public cleanToast(): void{
    this.toastList.update((toastList) => toastList.slice(0, -1))
  }
}
