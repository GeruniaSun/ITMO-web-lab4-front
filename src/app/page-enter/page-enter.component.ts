import { Component } from '@angular/core';
import {AuthorisationPanelComponent} from '../authorisation-panel/authorisation-panel.component';
import {ClockComponent} from '../clock/clock.component';

@Component({
  selector: 'app-page-enter',
  imports: [
    AuthorisationPanelComponent,
    ClockComponent
  ],
  templateUrl: './page-enter.component.html',
  standalone: true,
  styleUrl: './page-enter.component.sass'
})
export class PageEnterComponent {

}
