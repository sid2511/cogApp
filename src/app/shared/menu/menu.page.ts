import { Component, OnInit } from '@angular/core';
import { EventemitterService } from '../eventemitter.service'
import { MenuController } from '@ionic/angular'

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  level: number ;

  constructor(
    private eventEmitter: EventemitterService,
    private menu: MenuController
  ) {}

  ngOnInit() {
    this.eventEmitter.currentLevel.subscribe(level => this.level = level)
}

  onCloseMenu(string?: string){
    this.menu.close("pause")
    if (string){
      this.eventEmitter.onGameState(string)
    }
  }

  onPause(){
    this.eventEmitter.onGameState('pause')
  }
}
