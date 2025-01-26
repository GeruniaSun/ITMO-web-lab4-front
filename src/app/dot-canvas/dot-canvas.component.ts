import {AfterViewInit, Component} from '@angular/core';
import {CanvasDrawer} from './canvas-drawer';
import { DotsService } from '../dots.service';

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
    const r = this.canvasDrawer.lastR

    this.dotsService.addDot(x, y, r).then(dot => {
      console.log(dot)
      dot ? this.canvasDrawer.dotsPush(dot) : console.log("дотик нул")
    })
  }
}
