import { Component, OnInit, Input } from '@angular/core';
import { StroopService } from './stroop-service.service';
import { answerButton } from './answerButton.model'
import { level } from './level.model'
import { MenuController } from '@ionic/angular';
import { EventemitterService } from '../shared/eventemitter.service'
import { Router } from '@angular/router';
import { Animation, AnimationController } from '@ionic/angular';


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
  currentLevel = 1;
  colorAnswerCount = 0;
  wordAnswerCount = 0;
  levelAnswerCount: number = 0;
  correctCount = 0;
  startSeen = true ;
  roundScore: number = 0;
  //rootElement = <HTMLElement>document.querySelector(':root') 
  toGet: number ;
  cardSeen = false;
  message: string;
  levelDone: boolean ;
  loopCount: number = 0;

  shuffle(array:Array<string>) { // Common shuffle algorithm used online
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
  }    
  return array;
  } 

  createPool(value:number, arr:string[]){ // For ratios in all questions
    let final: string[] = [] ;

    for(let count = 0; count<arr.length; count++){
      for (let i=1; i<=value; i++){
        final.push(arr[count])
      } 
    }
   return this.shuffle(final) ;
  }

  booleanPool(trueValue: number, falseValue: number){ // For ratios in the box-type questions
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

      console.log(this.levelArray[this.currentLevel-1])

      //this.rootElement.style.setProperty('answerButtonHeight', '100%')

      //this.eventemitter.onSendLevel(this.currentLevel)

      this.startSeen = false ;
      //this.answer = this.data.random(this.levelArray[this.currentLevel-1].wordPool)

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

createTypeOne(){ // Creates question of word type

  this.valueArray = this.createPool((this.levelArray[this.currentLevel-1].elementCount/this.levelArray[this.currentLevel-1].colorPool.length)+1, this.levelArray[this.currentLevel-1].wordPool)
  this.colorArray = this.createPool((this.levelArray[this.currentLevel-1].elementCount/this.levelArray[this.currentLevel-1].colorPool.length)+1, this.levelArray[this.currentLevel-1].colorPool)
  if (this.loopCount > this.levelArray[this.currentLevel-1].wordPool.length){
    this.loopCount = 0 }
  this.answer = (this.levelArray[this.currentLevel-1].wordPool[this.loopCount])
  this.loopCount++
  

  for(let i=0; i<=this.levelArray[this.currentLevel-1].elementCount; i++){
        
    
    this.buttonValue = this.valueArray[i]
    this.buttonColor = this.colorArray[i]

    this.question = 'Select the words that say' + ' ' + this.answer 

    this.buttonArray.push(new answerButton (this.buttonValue, false, this.buttonColor, 'clear'))     
    
    if(this.buttonValue == this.answer){ 
      this.levelAnswerCount++
 }
}
}
    

createTypeTwo(){ // Creates question of color type

  this.valueArray = this.createPool((this.levelArray[this.currentLevel-1].elementCount/this.levelArray[this.currentLevel-1].colorPool.length)+1, this.levelArray[this.currentLevel-1].wordPool)
  this.colorArray = this.createPool(this.levelArray[this.currentLevel-1].elementCount/this.levelArray[this.currentLevel-1].colorPool.length, this.levelArray[this.currentLevel-1].colorPool)
  this.answer = this.data.random(this.levelArray[this.currentLevel-1].colorPool)

  for(let i=0; i<=this.levelArray[this.currentLevel-1].elementCount; i++){
        
    this.buttonValue = this.data.random(this.valueArray)
    this.buttonColor = this.data.random(this.colorArray)

    this.question = 'Select the words colored' + ' ' + this.answer

    this.buttonArray.push(new answerButton (this.buttonValue, false, this.buttonColor, 'clear'))     
    
    if(this.buttonColor == this.answer){ 
      this.levelAnswerCount++
      
  }}
}

createTypeThree(){ // Creates question of box type

  this.valueArray = this.createPool((this.levelArray[this.currentLevel-1].elementCount/this.levelArray[this.currentLevel-1].colorPool.length)+1, this.levelArray[this.currentLevel-1].wordPool)
  this.colorArray = this.createPool((this.levelArray[this.currentLevel-1].elementCount/this.levelArray[this.currentLevel-1].colorPool.length)+1, this.levelArray[this.currentLevel-1].colorPool)
  this.answer = this.data.random(this.levelArray[this.currentLevel-1].wordPool)

  let temp = this.shuffle((this.booleanPool(15,15)))

  for(let i=0; i<=this.levelArray[this.currentLevel-1].elementCount; i++){
        
    this.buttonValue = this.valueArray[i]//this.data.random(this.valueArray)
    this.buttonColor = this.colorArray[i]//this.data.random(this.colorArray)

    let boxTemp = temp[i]

    this.question = 'Select the words that say' + ' ' + this.answer + ' ' + 'not in a box'

    this.buttonArray.push(new answerButton (this.buttonValue, false, this.buttonColor, boxTemp))     
    
    if(this.buttonValue == this.answer && boxTemp == 'clear'){ 
      this.levelAnswerCount++
        }}
        console.log(this.levelAnswerCount)
}

checkAnswer(index, colorValue: string, wordValue: string, boxValue: string){ //Main answer checking function

  if (this.levelArray[this.currentLevel-1].type == 1){
    if (wordValue == this.answer){
      this.roundScore+=10 
      this.levelArray[this.currentLevel-1].totalScore+=10
      this.correctCount++ 
      console.log("Index is " + index)
      this.buttonArray[index].value="Correct!"
      this.buttonArray[index].color="Black"
      setTimeout(() => {
        this.buttonArray[index].value=" "
        this.buttonArray[index].color="White"
      }, 500)

    }
    else{
      this.roundScore-=5;
      this.levelArray[this.currentLevel-1].totalScore-=5;
      this.buttonArray[index].value="Wrong!"
      this.buttonArray[index].color="Black"
      setTimeout(() => {
        this.buttonArray[index].value=" "
        this.buttonArray[index].color="White"
      }, 500)

    }
  }

  if (this.levelArray[this.currentLevel-1].type == 2){
    if (colorValue == this.answer){
        this.roundScore+=10 
        this.levelArray[this.currentLevel-1].totalScore+=10
        this.correctCount++ ;
        console.log("Index is " + index)
        this.buttonArray[index].value="Correct!"
        this.buttonArray[index].color="Black"
          setTimeout(() => {
        this.buttonArray[index].value=" "
        this.buttonArray[index].color="White"
       }, 500)

    }
    else{
      this.roundScore-=5;
      this.levelArray[this.currentLevel-1].totalScore-=5;
      this.buttonArray[index].value="Wrong!"
      this.buttonArray[index].color="Black"
      setTimeout(() => {
        this.buttonArray[index].value=" "
        this.buttonArray[index].color="White"
      }, 500)

    }
  } 

  if (this.levelArray[this.currentLevel-1].type == 3){
    if (wordValue == this.answer && boxValue == 'clear'){
        this.roundScore+=10 
        this.levelArray[this.currentLevel-1].totalScore+=10
        this.correctCount++ ;
        console.log("Index is " + index)
        this.buttonArray[index].value="Correct!"
        this.buttonArray[index].color="Black"
          setTimeout(() => {
        this.buttonArray[index].value=" "
        this.buttonArray[index].color="White"
      }, 500)

    }
    else{
      this.roundScore-=5;
      this.levelArray[this.currentLevel-1].totalScore-=5;
      this.buttonArray[index].value="Wrong!"
      this.buttonArray[index].color="Black"
      setTimeout(() => {
        this.buttonArray[index].value=" "
        this.buttonArray[index].color="White"
      }, 500)


    }
  }
  if(this.correctCount == this.levelAnswerCount && this.levelArray[this.currentLevel-1].totalScore >= this.levelArray[this.currentLevel-1].scoreReq){ 
    if(this.currentLevel-1 >= 10){
      this.message="Game Complete!!!"
      this.endLevelCard()   
    }
    this.levelDone = true;
    setTimeout(() => {
      this.endLevelCard() 
    }, 200) 
    this.message = "Level Complete!"

  }
  else if (this.correctCount == this.levelAnswerCount){
    //this.nextRound()
    //this.cardSeen = true;
    this.levelDone = false;
    setTimeout(() => {
      this.card()
    }, 200)
    
  }
  this.toGet = this.levelArray[this.currentLevel-1].scoreReq - this.levelArray[this.currentLevel-1].totalScore;
  console.log("Button Color, Value, Fill is" + ' ' + colorValue, wordValue, boxValue)
  console.log("Round Score is" + ' ' + this.roundScore)
  console.log("Total Score is" + ' ' + this.levelArray[this.currentLevel-1].totalScore)

  //this.eventemitter.onSendScore(this.levelArray[this.currentLevel-1].totalScore)
}

endLevelCard(){ // End of level card

  this.cardSeen = true
  //this.message = "Level Complete!"

  const cardPopup = this.animationCtrl.create()
  .addElement(document.querySelector('.card'))
  .duration(250)
  .iterations(1)
  .fromTo('opacity', '0', '1')
  .fromTo('top', '90%', '45%');
  cardPopup.play()

  this.question = ' ';

  let i = 0

  for (i; i<this.buttonArray.length; i++){
    this.buttonArray[i].clicked=true
  }

}

card(){ // End of round card

  this.cardSeen=true
  this.message = "You need" + ' ' + this.toGet + ' ' +  "points to clear the level"

   const cardPopup = this.animationCtrl.create()
  .addElement(document.querySelector('.card'))
  .duration(250)
  .iterations(1)
  .fromTo('opacity', '0', '1')
  .fromTo('top', '90%', '45%');
  cardPopup.play()

  //this.cardSeen = true;
  this.question = '';
  //this.buttonArray = [];

  let i = 0

  for (i; i<this.buttonArray.length; i++){
    this.buttonArray[i].clicked=true
  }
}

newRound(){ // This is for the menu when restart is clicked so the current round score is erased but the score of the previous rounds remain
  this.valueArray = [];
  this.colorArray = [];
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
  this.cardSeen=false

  this.levelArray[this.currentLevel-1].totalScore = this.levelArray[this.currentLevel-1].totalScore - this.roundScore
  //this.eventemitter.onSendScore(this.levelArray[this.currentLevel-1].totalScore)
  console.log('New score is' + ' '  + this.levelArray[this.currentLevel-1].totalScore)
  
  this.createLevel()
}

getId(){ // To change level bluriness when card animation plays
  if (this.cardSeen==true){
    return 'roundBlur'
  }
  else {
    return 'round'
  }
}

nextRound(){ // To move on to the next round

  if (this.levelDone == true){
    this.nextLevel()
  }

   const cardPopup = this.animationCtrl.create()
  .addElement(document.querySelector('.card'))
  .duration(250)
  .iterations(1)
  .fromTo('opacity', '1', '0')
  .fromTo('top', '45%', '90%');
  cardPopup.play()

  this.valueArray = [];
  this.colorArray = [];
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
  this.cardSeen=false
  
  this.createLevel()
}

nextLevel(){ // To move on to the next level

  const cardPopup = this.animationCtrl.create()
  .addElement(document.querySelector('.card'))
  .duration(250)
  .iterations(1)
  .fromTo('opacity', '1', '0')
  .fromTo('top', '45%', '90%');
  cardPopup.play()

  this.valueArray = [];
  this.colorArray = [];
  this.buttonArray = [];
  this.valueArray = []
  this.buttonValue = '';
  this.colorArray = [];
  this.buttonColor = '';
  this.question = '';
  this.answer = '';
  this.loopCount = 0;
  this.currentLevel++ ;
  this.colorAnswerCount = 0;
  this.wordAnswerCount = 0;
  this.levelAnswerCount = 0;
  this.correctCount = 0;
  this.roundScore = 0;
  this.cardSeen=false

  //this.eventemitter.onSendScore(0)
  console.log('Next level')
  

  this.createLevel()

}

onRestart(){ // If restart in menu is clicked
  console.log('Game Restarted')

  let i = 0

  for(i; i<this.buttonArray.length;  i++){
    this.buttonArray[i].clicked = false ;
  }

  this.newRound()
}

onResume(){ // If resume in menu is clicked
}

quitGame(){ // If quit game in menu is clicked
  this.levelArray[this.currentLevel-1].totalScore = this.levelArray[this.currentLevel-1].totalScore - this.roundScore
  this.router.navigate(['/home'])
}

endGame(){ 

}

getColor(value: string) { // To get the colors of the buttons
  switch (value){
    case 'Red':
      return '#ff0000'
    case 'Blue':
      return '#0646c7'
    case 'Yellow':
      return '#ebc50c'
    case 'Green':
      return '#19d408'
    case 'Black':
      return '#000000'
    case 'Pink':
      return '#eb0ca8'
    case 'Brown':
      return '#6b2f01'
    case 'White':
      return '#ffffff'

  }}

 getFill(value) { // To get the fill of rhw buttons 
   switch(value){
     case true:
      return 'outline'
     case false:
      return 'clear'
   }
 }

  

constructor(
  private data: StroopService, 
  //private menu: MenuController,
  private router: Router,
  private eventemitter: EventemitterService,
  private animationCtrl: AnimationController){}

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
      }
       
    })
  }
}
