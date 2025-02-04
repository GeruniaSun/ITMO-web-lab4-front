import {Dot} from '../dot';

export class CanvasDrawer{

  public static canvas: HTMLCanvasElement;
  private static ctx: CanvasRenderingContext2D;

  private static originX: number;
  private static originY: number;
  private static scale: number;
  public static lastR = 3;

  private static dots: Dot[] = [];
  private static styles = {
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
    CanvasDrawer.canvas = document.getElementById('canvas') as HTMLCanvasElement;
    CanvasDrawer.ctx = CanvasDrawer.canvas.getContext('2d')!;

    CanvasDrawer.originX = CanvasDrawer.canvas.width / 2;
    CanvasDrawer.originY = CanvasDrawer.canvas.height / 2;
    CanvasDrawer.scale = CanvasDrawer.canvas.height / 10;

    CanvasDrawer.refreshCanvas(CanvasDrawer.lastR);
  }

// TODO можно лейблы для X, Y, R, R/2 добавить (а можно не можно)
  public static refreshCanvas(r: number) {
    console.log("redrawing " + r);
    CanvasDrawer.lastR = r;
    CanvasDrawer.ctx.clearRect(0, 0, CanvasDrawer.canvas.width, CanvasDrawer.canvas.height);
    this.drawGrid();
    this.drawAxes();
    this.drawArea(r);
    this.dots.forEach(dot => this.drawPoint(dot.x, dot.y, dot.hit));
  }

  public dotsPush(dot: Dot) {
    CanvasDrawer.dots.push(dot);
    //this.playRandomAudio(dot.hit)
    CanvasDrawer.refreshCanvas(dot.r)
  }

// private extractDotsFromTable() {
//   data.forEach(attempt => this.dots.push([attempt.x, attempt.y, attempt.hit])); // TODO поправить
// }

// возвращает координаты клика в нужных координатах
  public getClickCoordinates(event: MouseEvent) {
    const rect = CanvasDrawer.canvas.getBoundingClientRect();

    const xClick = event.clientX - rect.left;
    const yClick = event.clientY - rect.top;

    const xRes = ((xClick - CanvasDrawer.originX) / CanvasDrawer.scale).toFixed(2);
    const yRes = (-1 * (yClick - CanvasDrawer.originY) / CanvasDrawer.scale).toFixed(2);

    return { x: xRes, y: yRes };
  }

  private static drawPoint(x: number, y: number, hit: boolean) {
    CanvasDrawer.ctx.fillStyle = hit ? CanvasDrawer.styles.point_hit_color : CanvasDrawer.styles.point_miss_color;
    CanvasDrawer.ctx.beginPath();
    CanvasDrawer.ctx.arc(this.originX + x * this.scale, this.originY - y * this.scale,
      5, 0, 2 * Math.PI);
    CanvasDrawer.ctx.fill();
    CanvasDrawer.ctx.closePath();
  }

  private static drawGrid() {
    const gridSpacing = this.scale / 4;
    CanvasDrawer.ctx.clearRect(0, 0, CanvasDrawer.canvas.width, CanvasDrawer.canvas.height);

    // стили клеток
    CanvasDrawer.ctx.strokeStyle = CanvasDrawer.styles.grid_line_color;
    CanvasDrawer.ctx.lineWidth = CanvasDrawer.styles.grid_line_width;

    // вертикальные линии
    for (let x = 0; x <= CanvasDrawer.canvas.width; x += gridSpacing) {
      CanvasDrawer.ctx.beginPath();
      CanvasDrawer.ctx.moveTo(x, 0);
      CanvasDrawer.ctx.lineTo(x, CanvasDrawer.canvas.height);
      CanvasDrawer.ctx.stroke();
    }

    // горизонтальные линии
    for (let y = 0; y <= CanvasDrawer.canvas.height; y += gridSpacing) {
      CanvasDrawer.ctx.beginPath();
      CanvasDrawer.ctx.moveTo(0, y);
      CanvasDrawer.ctx.lineTo(CanvasDrawer.canvas.width, y);
      CanvasDrawer.ctx.stroke();
    }
  }

  private static drawAxes() {
    // стили стрелок и осей
    CanvasDrawer.ctx.strokeStyle = CanvasDrawer.styles.axis_color;
    CanvasDrawer.ctx.fillStyle = CanvasDrawer.styles.axis_arrows_fill_color;
    CanvasDrawer.ctx.lineWidth = CanvasDrawer.styles.axis_width;

  // оси
    CanvasDrawer.ctx.beginPath();
    CanvasDrawer.ctx.moveTo(this.originX, 0);
    CanvasDrawer.ctx.lineTo(this.originX, CanvasDrawer.canvas.height);
    CanvasDrawer.ctx.moveTo(0, this.originY);
    CanvasDrawer.ctx.lineTo(CanvasDrawer.canvas.width, this.originY);
    CanvasDrawer.ctx.stroke();

    // стрелка X
    CanvasDrawer.ctx.beginPath();
    CanvasDrawer.ctx.moveTo(CanvasDrawer.canvas.width/2, 0)
    CanvasDrawer.ctx.lineTo(CanvasDrawer.canvas.width/2 - 15, 20);
    CanvasDrawer.ctx.lineTo(CanvasDrawer.canvas.width/2 + 15, 20);
    CanvasDrawer.ctx.closePath();
    CanvasDrawer.ctx.fill();

    // стрелка Y
    CanvasDrawer.ctx.beginPath();
    CanvasDrawer.ctx.moveTo(CanvasDrawer.canvas.width, CanvasDrawer.canvas.height/2)
    CanvasDrawer.ctx.lineTo(CanvasDrawer.canvas.width - 20, CanvasDrawer.canvas.height/2 - 15);
    CanvasDrawer.ctx.lineTo(CanvasDrawer.canvas.width - 20, CanvasDrawer.canvas.height/2 + 15);
    CanvasDrawer.ctx.closePath();
    CanvasDrawer.ctx.fill();
  }

  private static drawArea(r: number) {
    // стили
    CanvasDrawer.ctx.fillStyle = CanvasDrawer.styles.area_fill_color;
    CanvasDrawer.ctx.strokeStyle = CanvasDrawer.styles.area_line_color;
    CanvasDrawer.ctx.lineWidth = CanvasDrawer.styles.area_line_width;

    CanvasDrawer.ctx.beginPath();
    // 1-ая четверть
    CanvasDrawer.ctx.moveTo(this.originX, this.originY);
    CanvasDrawer.ctx.arc(this.originX, this.originY, r/2 * this.scale, 3 * Math.PI / 2,  2 * Math.PI);

    // 3-ья четверть
    CanvasDrawer.ctx.lineTo(this.originX, this.originY);
    CanvasDrawer.ctx.lineTo(this.originX - r * this.scale, this.originY);
    CanvasDrawer.ctx.lineTo(this.originX - r * this.scale, this.originY + r/2 * this.scale);
    CanvasDrawer.ctx.lineTo(this.originX, this.originY + r/2 * this.scale);

    // 4-ая четверть
    CanvasDrawer.ctx.lineTo(this.originX + r/2 * this.scale, this.originY);
    CanvasDrawer.ctx.lineTo(this.originX, this.originY);

    CanvasDrawer.ctx.fill();
    CanvasDrawer.ctx.stroke();
    CanvasDrawer.ctx.closePath();
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
