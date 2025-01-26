import {Injectable} from '@angular/core';
import {Dot} from './dot';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DotsService {
  constructor(private http: HttpClient) {
  }

  async getAllDots(): Promise<Dot[]> {
    const data = await fetch('http://localhost:8080/main'); // TODO тут через http надо тоже
    return (await data.json()) ?? [];
  }

  public addDot(x: number, y: number, r: number): Promise<Dot | null> {
    return new Promise ( (resolve, reject) =>
      this.http.post("http://localhost:8080/check", {x: x, y: y, r: r})
      .subscribe(
        (data: any) => {
          const dot: Dot = {
            x: data.x,
            y: data.y,
            r: data.r,
            hit: data.hit,
            datetime: data.datetime
          }
          console.log(`addDot нареспонсил такое:\nx: ${dot.x}\ny: ${dot.y}\nr: ${dot.r}
          hit: ${dot.hit}\ndatetime: ${dot.datetime}`)

          resolve(dot)
        },
        (error) => {
          console.error('Ошибка:', error);
          //alert('ошибочка вышла: ' + error) //мб поменять
          resolve(null)
        }
      )
    )
  }
}
