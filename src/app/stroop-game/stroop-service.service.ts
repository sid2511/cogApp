import { Injectable } from '@angular/core';
import { level } from './level.model'
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class StroopService {
  levelArray: level[] = 
    [
      new level (
        1,
        0,
        200,
        23,
        ['Black'],
        ['Red', 'Yellow', 'Green', 'Blue'],
        1
      ),
      new level (
        2,
        0,
        200,
        28,
        ['Red', 'Black', 'Yellow'],
        ['Red', 'Black', 'Yellow'],
        2
      ),
      new level (
       3,
       0,
       200,
       28,
       ['Yellow', 'Pink', 'Black'],
       ['Yellow', 'Pink', 'Black'],
      1
    
    ), 
      new level (
        4,
        0,
        200,
        28,
        ['Green', 'Blue', 'Red'],
        ['Green', 'Blue', 'Red'],
        3
      ),
      new level (
        5,
        0,
        200,
        28,
        ['Black', 'Green', 'Red', 'Blue'],
        ['Red', 'Black', 'Green', 'Blue'],
        3
      ),
      new level (
        6,
        0,
        200,
        31,
        ['Green', 'Blue', 'Black', 'Red'],
        ['Red', 'Black', 'Green', 'Blue'],
        1
      ),
      new level (
        7,
        0,
        200,
        31,
        ['Red', 'Yellow', 'Green', 'Blue'],
        ['Red', 'Brown', 'Yellow', 'Blue'],
        2
      ),
      new level (
        8,
        0,
        220,
        28,
        ['Red', 'Black', 'Green', 'Yellow'],
        ['Blue', 'Red', 'Yellow', 'Blue'],
        3
      ),
      new level (
        9,
        0,
        240,
        31,
        ['Yellow', 'Black', 'Green', 'Blue'],
        ['Red', 'Green', 'Black', 'Blue'],
        1
      ),
      new level (
        10,
        0,
        260,
        31,
        ['Red', 'Yellow', 'Green', 'Blue'],
        ['Red', 'Green', 'Yellow', 'Blue'],
        2
      )
    ]

  private level = new BehaviorSubject<level[]>(this.levelArray);
  sendlevel = this.level.asObservable();

  constructor() {}

  random(arr: string[]){
    let string: string = arr[Math.floor(Math.random() * arr.length)]
    return string ;
  }
}
