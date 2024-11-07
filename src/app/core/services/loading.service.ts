import { Injectable, signal } from '@angular/core';

@Injectable()
export class LoadingService {
  public readonly loading = signal(false);

  show():void{
    this.loading.set(true);
  }
  
  hide():void{
    this.loading.set(false);
  }
}
