import { BoundText } from "@angular/compiler/src/render3/r3_ast";

export class answerButton {
    value: string ;
    clicked: boolean ; 
    color: string ;
    box: string;
    
    constructor (value: string, clicked: boolean, color: string, box:string){
        this.value = value ;
        this.clicked = clicked ;
        this.color = color ;
        this.box = box ;
    }
}