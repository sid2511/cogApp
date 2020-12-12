import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class StroopService {

  constructor() {}

  random(arr: string[]){
    let string: string = arr[Math.floor(Math.random() * arr.length)]
    return string ;
  }
}
