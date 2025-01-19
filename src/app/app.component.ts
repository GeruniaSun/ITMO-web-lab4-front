import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {StudentHatComponent} from './student-hat/student-hat.component';
import {HeaderComponent} from './header/header.component';
import {ClockComponent} from './clock/clock.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, StudentHatComponent, HeaderComponent, ClockComponent],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.sass'
})
export class AppComponent {
  title = 'WebLab4';
}
