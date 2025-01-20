import { Component } from '@angular/core';
import {ClockComponent} from './clock/clock.component';
import {AuthorisationPanelComponent} from './authorisation-panel/authorisation-panel.component';
import {NgOptimizedImage} from '@angular/common';
import {RouterModule} from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterModule, ClockComponent, AuthorisationPanelComponent, NgOptimizedImage],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.sass'
})
export class AppComponent {
  title = 'WebLab4';
}
