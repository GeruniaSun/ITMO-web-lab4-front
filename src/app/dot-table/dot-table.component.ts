import { Component } from '@angular/core';
import { DotsService } from '../dots.service';
import {Dot} from '../dot';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-dot-table',
  imports: [
    NgForOf
  ],
  templateUrl: './dot-table.component.html',
  standalone: true,
  styleUrl: './dot-table.component.sass'
})

export class DotTableComponent {
  dots: Dot[] = [];

  constructor(private dotsService: DotsService) {
    this.dots = dotsService.getAllDots();
  }


}
