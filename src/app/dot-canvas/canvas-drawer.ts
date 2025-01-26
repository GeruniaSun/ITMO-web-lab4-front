import {Dot} from '../dot';

export class CanvasDrawer{

  private canvas!: HTMLCanvasElement;
  private ctx!: CanvasRenderingContext2D;

  private originX!: number;
  private originY!: number;
  private scale!: number;
  public lastR = 3;

  private dots: Dot[] = [];
  private styles = {
    'grid_line_color': 'white',
    'grid_line_width': 1,
    'axis_color': 'orange',
    'axis_width': 3,
    'axis_arrows_fill_color': 'rgba(255, 165, 0, 0.5)',
    'area_fill_color': 'rgba(255, 165, 0, 0.5)',
    'area_line_color': 'orange',
    'area_line_width': 1,
    'point_hit_color': 'orange',
    'point_miss_color': 'white'
  }

  constructor() {
    window.onload = () => {
      this.initik()
    }
  }
  initik() {
    this.canvas = document.getElementById('canvas') as HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d')!;

    this.originX = this.canvas.width / 2;
    this.originY = this.canvas.height / 2;
    this.scale = this.canvas.height / 10;

    this.refreshCanvas(this.lastR);
  }

// TODO можно лейблы для X, Y, R, R/2 добавить (а можно не можно)
  public refreshCanvas(r: number) {
    console.log("redrawing");
    this.lastR = r;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawGrid();
    this.drawAxes();
    this.drawArea(r);
    this.dots.forEach(dot => this.drawPoint(dot.x, dot.y, dot.hit));
  }

  public dotsPush(dot: Dot) {
    this.dots.push(dot);
    this.playRandomAudio(dot.hit)
    this.refreshCanvas(dot.r)
  }

// private extractDotsFromTable() {
//   data.forEach(attempt => this.dots.push([attempt.x, attempt.y, attempt.hit])); // TODO поправить
// }

// возвращает координаты клика в нужных координатах
  public getClickCoordinates(event: MouseEvent) {
    const rect = this.canvas.getBoundingClientRect();

    const xClick = event.clientX - rect.left;
    const yClick = event.clientY - rect.top;

    const xRes = ((xClick - this.originX) / this.scale).toFixed(2);
    const yRes = (-1 * (yClick - this.originY) / this.scale).toFixed(2);

    return { x: xRes, y: yRes };
  }

  private drawPoint(x: number, y: number, hit: boolean) {
    this.ctx.fillStyle = hit ? this.styles.point_hit_color : this.styles.point_miss_color;
    this.ctx.beginPath();
    this.ctx.arc(this.originX + x * this.scale, this.originY - y * this.scale,
      5, 0, 2 * Math.PI);
    this.ctx.fill();
    this.ctx.closePath();
  }

  private drawGrid() {
    const gridSpacing = this.scale / 4;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // стили клеток
    this.ctx.strokeStyle = this.styles.grid_line_color;
    this.ctx.lineWidth = this.styles.grid_line_width;

    // вертикальные линии
    for (let x = 0; x <= this.canvas.width; x += gridSpacing) {
      this.ctx.beginPath();
      this.ctx.moveTo(x, 0);
      this.ctx.lineTo(x, this.canvas.height);
      this.ctx.stroke();
    }

    // горизонтальные линии
    for (let y = 0; y <= this.canvas.height; y += gridSpacing) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(this.canvas.width, y);
      this.ctx.stroke();
    }
  }

  private drawAxes() {
    // стили стрелок и осей
    this.ctx.strokeStyle = this.styles.axis_color;
    this.ctx.fillStyle = this.styles.axis_arrows_fill_color;
    this.ctx.lineWidth = this.styles.axis_width;

  // оси
    this.ctx.beginPath();
    this.ctx.moveTo(this.originX, 0);
    this.ctx.lineTo(this.originX, this.canvas.height);
    this.ctx.moveTo(0, this.originY);
    this.ctx.lineTo(this.canvas.width, this.originY);
    this.ctx.stroke();

    // стрелка X
    this.ctx.beginPath();
    this.ctx.moveTo(this.canvas.width/2, 0)
    this.ctx.lineTo(this.canvas.width/2 - 15, 20);
    this.ctx.lineTo(this.canvas.width/2 + 15, 20);
    this.ctx.closePath();
    this.ctx.fill();

    // стрелка Y
    this.ctx.beginPath();
    this.ctx.moveTo(this.canvas.width, this.canvas.height/2)
    this.ctx.lineTo(this.canvas.width - 20, this.canvas.height/2 - 15);
    this.ctx.lineTo(this.canvas.width - 20, this.canvas.height/2 + 15);
    this.ctx.closePath();
    this.ctx.fill();
  }

  private drawArea(r: number) {
    // стили
    this.ctx.fillStyle = this.styles.area_fill_color;
    this.ctx.strokeStyle = this.styles.area_line_color;
    this.ctx.lineWidth = this.styles.area_line_width;

    this.ctx.beginPath();
    // 1-ая четверть
    this.ctx.moveTo(this.originX, this.originY);
    this.ctx.arc(this.originX, this.originY, r/2 * this.scale, 3 * Math.PI / 2,  2 * Math.PI);

    // 3-ья четверть
    this.ctx.lineTo(this.originX, this.originY);
    this.ctx.lineTo(this.originX - r * this.scale, this.originY);
    this.ctx.lineTo(this.originX - r * this.scale, this.originY + r/2 * this.scale);
    this.ctx.lineTo(this.originX, this.originY + r/2 * this.scale);

    // 4-ая четверть
    this.ctx.lineTo(this.originX + r/2 * this.scale, this.originY);
    this.ctx.lineTo(this.originX, this.originY);

    this.ctx.fill();
    this.ctx.stroke();
    this.ctx.closePath();
  }

  // private hitSounds = [
  //   '../../assets/sounds/oue.mp3',
  //   '../../assets/sounds/yeei.mp3',
  //   '../../assets/sounds/oleg.mp3'
  // ];
  //
  // private missSounds = [
  //   '../../assets/sounds/bruh.mp3',
  //   '../../assets/sounds/datyche.mp3',
  //   '../../assets/sounds/nepravilno.mp3',
  //   '../../assets/sounds/nope.mp3'
  // ];
  //
  // private playRandomAudio(hit: boolean) {
  //   const audios = hit ? this.hitSounds : this.missSounds
  //   const randomIndex = Math.floor(Math.random() * audios.length);
  //   const audio = new Audio(audios[randomIndex]);
  //
  //   audio.play()
  //     .catch(error => {
  //       console.error('Что-то не так со звуком:', error);
  //     });
  // }
}
