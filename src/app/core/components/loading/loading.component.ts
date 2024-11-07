import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LoadingService } from '@core/services/loading.service';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (loadingSvc.loading()) {
      <section class="backdrop">
        <div class="loader"></div>
      </section>
    }
  `,
  styleUrl: './loading.component.scss'
})
export class LoadingComponent {
  readonly loadingSvc = inject(LoadingService);
}
