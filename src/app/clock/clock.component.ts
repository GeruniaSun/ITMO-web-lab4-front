import {Component, AfterViewInit, HostListener} from '@angular/core';
@Component({
    selector: 'app-clock',
    imports: [],
    templateUrl: './clock.component.html',
    standalone: true,
    styleUrl: './clock.component.sass'
})
export class ClockComponent implements AfterViewInit{
  private clockCanvas!: HTMLCanvasElement;
  private ctx!: CanvasRenderingContext2D;

  private clockStyles = {
    circleFillColor: '#fff',
    circleLineColor: '#333',
    circleLineWidth: 8,
    numbersFont: 'bold 24px Arial',
    numbersFillColor: '#333',
    handsColor: '#333',
  };

  ngAfterViewInit(): void {
    this.clockCanvas = document.getElementById('clock') as HTMLCanvasElement;
    this.ctx = this.clockCanvas.getContext('2d')!;

    // Запуск обновления часов
    setInterval(() => this.drawClock(), 1000);
    this.drawClock();
  }

  private drawClock(): void {
    const now = new Date();
    const hours = now.getHours() % 12;
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const radius = this.clockCanvas.height / 2;

    this.ctx.clearRect(0, 0, this.clockCanvas.width, this.clockCanvas.height);
    this.ctx.save();
    this.ctx.translate(radius, radius);

    this.drawCircle(radius);
    this.drawNumbers(radius);

    this.drawHand((hours + minutes / 60) * (Math.PI / 6), radius - 100, 8);
    this.drawHand((minutes + seconds / 60) * (Math.PI / 30), radius - 70, 6);
    this.drawHand(seconds * (Math.PI / 30), radius - 50, 2);

    this.ctx.restore();
  }

  private drawCircle(radius: number): void {
    this.ctx.beginPath();
    this.ctx.arc(0, 0, radius - 20, 0, Math.PI * 2);
    this.ctx.fillStyle = this.clockStyles.circleFillColor;
    this.ctx.fill();
    this.ctx.strokeStyle = this.clockStyles.circleLineColor;
    this.ctx.lineWidth = this.clockStyles.circleLineWidth;
    this.ctx.stroke();
  }

  private drawNumbers(radius: number): void {
    this.ctx.font = this.clockStyles.numbersFont;
    this.ctx.fillStyle = this.clockStyles.numbersFillColor;
    for (let i = 1; i <= 12; i++) {
      const angle = i * (Math.PI / 6);
      this.ctx.save();
      this.ctx.rotate(angle);
      this.ctx.translate(0, -radius + 40);
      this.ctx.fillText(i.toString(), -10, 10);
      this.ctx.restore();
    }
  }

  private drawHand(angle: number, length: number, width: number): void {
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.rotate(angle);
    this.ctx.moveTo(0, 0);
    this.ctx.lineTo(0, -length);
    this.ctx.lineWidth = width;
    this.ctx.strokeStyle = this.clockStyles.handsColor;
    this.ctx.stroke();
    this.ctx.restore();
  }
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.adjustCanvasSize();
  }

  private adjustCanvasSize(): void {
    if (window.innerWidth >= 1069) {
      this.clockCanvas.width = 600;
      this.clockCanvas.height = 600;
    } else if (window.innerWidth >= 772) {
      this.clockCanvas.width = 400;
      this.clockCanvas.height = 400;
    } else {
      this.clockCanvas.width = window.innerWidth * 0.9;
      this.clockCanvas.height = window.innerWidth * 0.9;
    }
  }

}
