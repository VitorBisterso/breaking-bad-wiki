import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-spin',
  templateUrl: './spin.component.html',
  styleUrls: ['./spin.component.scss']
})
export class SpinComponent {
  @Input() isVisible: boolean;
}
