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
        21,
        ['Black'],
        ['Red', 'Yellow', 'Green', 'Blue'],
        'Select all the words that say',
        1
      ),
      new level (
        2,
        0,
        200,
        27,
        ['Red', 'Black', 'Yellow'],
        ['Red', 'Black', 'Yellow'],
        'Select all the words that are colored',
        2
      ),
      new level (
       3,
       0,
       200,
       30,
       ['Red', 'Brown', 'Pink', 'Black'],
       ['Red', 'Brown', 'Pink', 'Black'],
      'Select all the words that say',
      1
    
    ), 
      new level (
        4,
        0,
        200,
        30,
        ['Yellow', 'Brown', 'Blue', 'Pink', 'Black'],
        ['Yellow', 'Brown', 'Blue', 'Pink', 'Black'],
        'Select all the words that are colored',
        3
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
