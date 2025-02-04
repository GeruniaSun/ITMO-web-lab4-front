import {AfterViewInit, Component, ElementRef, HostListener, ViewChild} from '@angular/core';
import {CanvasDrawer} from './canvas-drawer';
import { DotsService } from '../dots.service';
import {from} from 'rxjs';

@Component({
  selector: 'app-dot-canvas',
  imports: [],
  templateUrl: './dot-canvas.component.html',
  standalone: true,
  styleUrl: './dot-canvas.component.sass'
})
export class DotCanvasComponent implements AfterViewInit{
  private canvasDrawer! : CanvasDrawer;

  ngAfterViewInit(): void { this.canvasDrawer = new CanvasDrawer()}

  constructor(private dotsService: DotsService) {}
  protected fetchClick(event: MouseEvent) {
    const click = this.canvasDrawer.getClickCoordinates(event)

    console.log(click)

    const x = Number.parseFloat(click.x)
    const y = Number.parseFloat(click.y)
    const r = CanvasDrawer.lastR

    this.dotsService.addDot(x, y, r).then(dot => {
      console.log(dot)
      dot ? this.canvasDrawer.dotsPush(dot) : console.log("дотик нул")
    })

    this.adjustCanvasSize();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.adjustCanvasSize();
  }

  private adjustCanvasSize(): void {
    const canvasElement = CanvasDrawer.canvas;

    if (window.innerWidth >= 1069) {
      canvasElement.width = 800;
      canvasElement.height = 800;
    } else if (window.innerWidth >= 772) {
      canvasElement.width = 600;
      canvasElement.height = 600;
    } else {
      canvasElement.width = window.innerWidth * 0.9;
      canvasElement.height = window.innerWidth * 0.9;
    }
  }
}
