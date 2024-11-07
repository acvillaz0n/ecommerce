import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {MatChipsModule} from '@angular/material/chips';

@Component({
  selector: 'app-selectable-list',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatChipsModule],
  templateUrl: './selectable-list.component.html',
})
export class SelectableListComponent {
  @Input() list: string[] = [];
}
