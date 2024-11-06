import { Component, inject } from '@angular/core';
import { LoadingService } from './core/services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  private readonly loadingSvc = inject(LoadingService);
  public isLoading = this.loadingSvc.loading;
}
