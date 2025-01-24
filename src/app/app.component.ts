import { Component } from '@angular/core';
import {RouterModule} from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterModule],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.sass'
})
export class AppComponent {
  title = 'WebLab4';
}
