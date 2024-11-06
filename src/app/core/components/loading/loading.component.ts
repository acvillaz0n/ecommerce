import { Component } from '@angular/core';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [],
  template: `
    <section class="backdrop">
      <div class="loader"></div>
    </section>
  `,
  styleUrl: './loading.component.scss'
})
export class LoadingComponent {

}
