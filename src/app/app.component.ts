import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ClockComponent} from './clock/clock.component';
import {AuthorisationPanelComponent} from './authorisation-panel/authorisation-panel.component';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ClockComponent, AuthorisationPanelComponent, NgOptimizedImage],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.sass'
})
export class AppComponent {
  title = 'WebLab4';
}
