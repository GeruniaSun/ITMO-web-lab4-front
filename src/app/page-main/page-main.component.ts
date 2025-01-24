import { Component } from '@angular/core';
import {DotCanvasComponent} from '../dot-canvas/dot-canvas.component';
import {DotFormComponent} from '../dot-form/dot-form.component';
import {NavigationBarComponent} from '../navigation-bar/navigation-bar.component';
import {DotTableComponent} from '../dot-table/dot-table.component';

@Component({
  selector: 'app-page-main',
  imports: [
    DotCanvasComponent,
    DotFormComponent,
    NavigationBarComponent,
    DotTableComponent
  ],
  templateUrl: './page-main.component.html',
  standalone: true,
  styleUrl: './page-main.component.sass'
})
export class PageMainComponent {

}
