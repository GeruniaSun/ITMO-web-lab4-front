import { Component } from '@angular/core';
import {DotCanvasComponent} from '../dot-canvas/dot-canvas.component';

@Component({
  selector: 'app-page-main',
  imports: [
    DotCanvasComponent
  ],
  templateUrl: './page-main.component.html',
  standalone: true,
  styleUrl: './page-main.component.sass'
})
export class PageMainComponent {

}
