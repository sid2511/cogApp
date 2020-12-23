import { Component, OnInit, Input } from '@angular/core';
import { StroopService } from './stroop-service.service';
import { answerButton } from './answerButton.model'
import { level } from './level.model'
import { MenuController } from '@ionic/angular';
import { EventemitterService } from '../shared/eventemitter.service'


@Component({
  selector: 'app-stroop-game',
  templateUrl: './stroop-game.page.html',
  styleUrls: ['./stroop-game.page.scss'],
})
export class StroopGamePage implements OnInit {
  levelArray: level[] = [];
  buttonArray: answerButton[] = [];
  valueArray: string[] ;
  buttonValue: string ;
  colorArray: string[];
  buttonColor: string ;
  question: string ;
  answer: string ;
  currentLevel = 2;
  colorAnswerCount = 0;
  wordAnswerCount = 0;
  levelAnswerCount: number = 0;
  correctCount = 0;
  startSeen = true ;
  roundScore: number = 0;
  rootElement = <HTMLElement>document.querySelector(':root') 
  toGet: number ;
  cardSeen = false ;

  shuffle(array:Array<string>) {
    for (var i = array.length - 1; i > 0; i--) {  
    
      // Generate random number  
      var j = Math.floor(Math.random() * (i + 1)); 
                   
      var temp = array[i]; 
      array[i] = array[j]; 
      array[j] = temp; 
  }       
  return array;
  } 

  createPool(value:number, arr:string[]){
    let final: string[] = [] ;

    for(let count = 0; count<arr.length; count++){
      for (let i=1; i<=value; i++){
        final.push(arr[count])
      } 
    }
   return this.shuffle(final) ;
  }

  booleanPool(trueValue: number, falseValue: number){
    let arr: string[] = [];

    for(let i = 0; i<trueValue; i++){
      arr.push('outline')
    }

    for(let j = 0; j<falseValue; j++){
      arr.push('clear')
    }
    return this.shuffle(arr)
  }

  createLevel(){

      //this.rootElement.style.setProperty('answerButtonHeight', '100%')

      this.eventemitter.onSendLevel(this.currentLevel)

      this.startSeen = false ;
      this.answer = this.data.random(this.levelArray[this.currentLevel-1].wordPool)

      //let currentQuestion = this.levelArray[this.currentLevel-1].question

      if(this.levelArray[this.currentLevel-1].type == 1){
        this.createTypeOne();
      }

      if(this.levelArray[this.currentLevel-1].type == 2){
        this.createTypeTwo();
      }
    
      if(this.levelArray[this.currentLevel-1].type == 3){
        this.createTypeThree();
      }

      /*for(let i=1; i<=this.levelArray[this.currentLevel-1].elementCount; i++){
        
        this.valueArray = this.createPool(this.levelArray[this.currentLevel-1].elementCount, this.levelArray[this.currentLevel-1].wordPool)
        this.buttonValue = this.data.random(this.levelArray[this.currentLevel-1].wordPool)

        this.colorArray = this.createPool(this.levelArray[this.currentLevel-1].elementCount, this.levelArray[this.currentLevel-1].colorPool)
        this.buttonColor = this.data.random(this.colorArray)

        this.question = this.levelArray[this.currentLevel-1].question + ' ' + this.answer + ' ' + this.levelArray[this.currentLevel-1].secq

        this.buttonArray.push(new answerButton (this.buttonValue, false, this.buttonColor))     
        
        if(currentQuestion == 'Select all the words that say'){
          if(this.buttonValue == this.answer){ 
          this.levelAnswerCount++
        }}

        else if (currentQuestion == 'Select all the words that are colored'){
          if(this.buttonColor == this.answer){
            this.levelAnswerCount++
          }}
        if (this.buttonValue == this.answer){
            this.wordAnswerCount++
          }
        
        if (this.buttonColor == this.answer){
            this.colorAnswerCount++
      }
    }*/
  }

createTypeOne(){

  this.valueArray = this.createPool(this.levelArray[this.currentLevel-1].elementCount+1, this.levelArray[this.currentLevel-1].wordPool)
  this.colorArray = this.createPool(this.levelArray[this.currentLevel-1].elementCount+1, this.levelArray[this.currentLevel-1].colorPool)

  for(let i=1; i<=this.levelArray[this.currentLevel-1].elementCount; i++){
        
    
    this.buttonValue = this.valueArray[i]
    this.buttonColor = this.colorArray[i]

    this.question = this.levelArray[this.currentLevel-1].question + ' ' + this.answer 

    this.buttonArray.push(new answerButton (this.buttonValue, false, this.buttonColor, 'clear'))     
    
    if(this.buttonValue == this.answer){ 
      this.levelAnswerCount++

  }}}

createTypeTwo(){

  this.valueArray = this.createPool(this.levelArray[this.currentLevel-1].elementCount, this.levelArray[this.currentLevel-1].wordPool)
  this.colorArray = this.createPool(this.levelArray[this.currentLevel-1].elementCount, this.levelArray[this.currentLevel-1].colorPool)

  for(let i=1; i<=this.levelArray[this.currentLevel-1].elementCount; i++){
        
    this.buttonValue = this.data.random(this.valueArray)
    this.buttonColor = this.data.random(this.colorArray)

    this.question = this.levelArray[this.currentLevel-1].question + ' ' + this.answer

    this.buttonArray.push(new answerButton (this.buttonValue, false, this.buttonColor, 'clear'))     
    
    if(this.buttonColor == this.answer){ 
      this.levelAnswerCount++
      
  }}
}

createTypeThree(){

  this.valueArray = this.createPool(this.levelArray[this.currentLevel-1].elementCount, this.levelArray[this.currentLevel-1].wordPool)
  this.colorArray = this.createPool(this.levelArray[this.currentLevel-1].elementCount, this.levelArray[this.currentLevel-1].colorPool)

  let temp = (this.booleanPool(14,22))

  for(let i=1; i<=this.levelArray[this.currentLevel-1].elementCount; i++){
        
    this.buttonValue = this.data.random(this.valueArray)
    this.buttonColor = this.data.random(this.colorArray)

    let boxTemp = temp[i]

    this.question = this.levelArray[this.currentLevel-1].question + ' ' + this.answer + ' ' + 'not in a box'

    this.buttonArray.push(new answerButton (this.buttonValue, false, this.buttonColor, boxTemp))     
    
    if(this.buttonColor == this.answer && boxTemp == 'clear'){ 
      this.levelAnswerCount++
      
  }}
}

checkAnswer(index, colorValue: string, wordValue: string, boxValue: string){

  if (this.levelArray[this.currentLevel-1].type == 1){
    if (wordValue == this.answer){
      this.roundScore+=10 
      this.levelArray[this.currentLevel-1].totalScore+=10
      this.correctCount++ 
    }
  }
  if (this.levelArray[this.currentLevel-1].type == 2){
    if (colorValue == this.answer){
        this.roundScore+=10 
        this.levelArray[this.currentLevel-1].totalScore+=10
        this.correctCount++ ;
    }
  } 

  if (this.levelArray[this.currentLevel-1].type == 3){
    if (colorValue == this.answer && boxValue == 'clear'){
        this.roundScore+=10 
        this.levelArray[this.currentLevel-1].totalScore+=10
        this.correctCount++ ;
    }
  }
  if(this.correctCount == this.levelAnswerCount && this.levelArray[this.currentLevel-1].totalScore >= this.levelArray[this.currentLevel-1].scoreReq){ 
    this.nextLevel()  
  }
  else if (this.correctCount == this.levelAnswerCount){
    //this.nextRound()
    this.cardSeen = true;
  }
  this.toGet = this.levelArray[this.currentLevel-1].scoreReq - this.levelArray[this.currentLevel-1].totalScore;
  console.log(colorValue, wordValue, boxValue)
  console.log(this.roundScore)
  console.log(this.levelArray[this.currentLevel-1].totalScore)
}

nextRound(){
  this.buttonArray = [];
  this.valueArray = []
  this.buttonValue = '';
  this.colorArray = [];
  this.buttonColor = '';
  this.question = '';
  this.answer = '';
  this.colorAnswerCount = 0;
  this.wordAnswerCount = 0;
  this.levelAnswerCount = 0;
  this.correctCount = 0;
  this.roundScore = 0;
  
  this.createLevel()
}

nextLevel(){
  this.buttonArray = [];
  this.valueArray = []
  this.buttonValue = '';
  this.colorArray = [];
  this.buttonColor = '';
  this.question = '';
  this.answer = '';
  this.currentLevel++ ;
  this.colorAnswerCount = 0;
  this.wordAnswerCount = 0;
  this.levelAnswerCount = 0;
  this.correctCount = 0;
  this.roundScore = 0;
  console.log('next level')
  

  this.createLevel()

}

onRestart(){
  console.log('test')
  this.correctCount = 0;
  this.roundScore = 0;

  let i = 0

  for(i; i<this.buttonArray.length;  i++){
    this.buttonArray[i].clicked = false ;
  }
}

onResume(){
}

quitGame(){
}

endGame(){

}

getColor(value: string) {
  switch (value){
    case 'Red':
      return '#fc2003'
    case 'Blue':
      return '#0b03fc'
    case 'Yellow':
      return '#ffea00'
    case 'Green':
      return '#03fc0f'
    case 'Black':
      return '#000000'
    case 'Pink':
      return '#ff00b7'
    case 'Brown':
      return '#D2691E'

  }}

 getFill(value) {
   switch(value){
     case true:
      return 'outline'
     case false:
      return 'clear'
   }
 }

  

constructor(
  private data: StroopService, 
  private menu: MenuController,
  private eventemitter: EventemitterService,){}

ngOnInit() {
    this.data.sendlevel.subscribe(level => this.levelArray = level)

    this.eventemitter.gameState.subscribe(value => {
      console.log(value)
      switch (value) {
        case 'start':
          this.createLevel()
          break
        case 'restart':
          this.onRestart()
          break
        case 'resume':
          this.onResume()
          break
        case 'quit':
          this.quitGame()
          break
        case 'pause':
          break
        case 'stop':
          this.endGame()
      }
       
    })
  }
}
