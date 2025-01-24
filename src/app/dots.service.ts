import { Injectable } from '@angular/core';
import {Dot} from './dot';

@Injectable({
  providedIn: 'root'
})
export class DotsService {

  private dots: Dot[] = [
    {
      x: 1,
      y: 2,
      r: 3,
      hit: true,
      datetime: '1010-10-10'
    },
    {
      x: 4,
      y: 5,
      r: 2,
      hit: false,
      datetime: '2020-20-20'
    },
    {
      x: -1,
      y: 0,
      r: 1,
      hit: true,
      datetime: '1020-14-13'
    },
  ]

  getAllDots(): Dot[] {
    return this.dots;
  }

  constructor() { }
}
