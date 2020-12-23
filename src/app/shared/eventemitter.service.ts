import { InjectableCompiler } from '@angular/compiler/src/injectable_compiler';
import { Injectable, EventEmitter } from '@angular/core'

@Injectable({
    providedIn: 'root'
})

export class EventemitterService{
    gameState = new EventEmitter<string>();
    currentLevel = new EventEmitter<number>()

    constructor(){}

    onGameState(string: string){
        this.gameState.emit(string)
    }

    onSendLevel(number: number){
        this.currentLevel.emit(number)
    }
}