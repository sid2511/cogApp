import { Component, OnInit } from '@angular/core';
import { StroopService } from './stroop-service.service';
import { answerButton } from './answerButton.model'

@Component({
  selector: 'app-stroop-game',
  templateUrl: './stroop-game.page.html',
  styleUrls: ['./stroop-game.page.scss'],
})
export class StroopGamePage implements OnInit {
  mainQuestionArray : string[] = ['Select all the words with the color', 'Select all the words that say']
  //colorsArray: string[] = [];
  //mainColorsArray: string[] = ['Red', 'Blue', 'Green', 'Yellow', 'Black', 'Pink', 'Brown'];
  colorsArray: string[] = ['Red', 'Blue', 'Green', 'Yellow', 'Black', 'Pink', 'Brown'];
  currentColor = '';
  currentQuestion = '';
  questionArray: Array<String> = [] ;
  buttonArray: answerButton[] = [] ;
  textColor: string;
  //disableValue = false ;
  correctCount: number = 0 ;
  wrongCount: number = 0 ;
  tempArray: Array<string> = [];
  // textColorTemp: string = '' ;
  randomTemp: string ;
  tempValueArray: Array<string> = [];
  finishCount = 0 ;
  levelMessage = '';
  //currentColor = this.colorsArray[Math.floor(Math.random() * this.colorsArray.length)]
  playSeen = true ; // To be Removed
  levelSeen = false ; // To be Removed
  //answersSeen = false ; // To be Removed
  restartSeen = false ; // To Be Removed
  itemCount: number = 5 ;
  levelCount = 0 ;
  start: number = 0 ;
  end: number = 3 ;
  endMessage: string ; //To be removed
  levelScore: number ;
  levelTime: number = 0;
  t=setInterval(this.timeCount,1000);

  constructor(private stroopService: StroopService) {}

  /*pushSpecific(array: Array<string>, a: number, b: number){
    let arr: Array<string> = [];

    for (a; a<b; a++){
      arr.push(array[a]);
    }
    return this.shuffle(arr) ;
  }*/

  shuffle(array: Array<string>) {
    for (var i = array.length - 1; i > 0; i--) {  
    
      // Generate random number  
      var j = Math.floor(Math.random() * (i + 1)); 
                   
      var temp = array[i]; 
      array[i] = array[j]; 
      array[j] = temp; 
  }       
  return array;
  } 

  multiPush(arr: Array<string>, count: number){

    let newArr: string[] = [];

    for (let c = 0; c<arr.length; c++){
      let temp = arr [c] ;
      for (let i = 0; i < count; i++){
        newArr.push(temp); 
      }
    }
    return this.shuffle(newArr) ;
  }

  /*arrayRatio(arr: string[], num:number){
    let value = Math.round(num / this.colorsArray.length) ;
  }*/

 getLevel(i: number){

  //if (this.start < this.mainColorsArray.length){
    //this.colorsArray = this.pushSpecific(this.mainColorsArray, this.start, this.end) //}

    this.levelSeen = true ;

    this.currentColor = this.stroopService.random(this.colorsArray)
    this.currentQuestion = this.stroopService.random(this.mainQuestionArray)

    this.itemCount = i ;

    this.questionArray.push(this.currentQuestion + ' ' + this.currentColor)

    this.tempArray = this.multiPush(this.colorsArray, Math.round(i/this.colorsArray.length))
    this.tempValueArray = this.multiPush(this.colorsArray, Math.round(i/this.colorsArray.length))

    for (let c = 0; c < this.tempArray.length; c++){

      this.randomTemp = this.tempValueArray[c]
      // this.tempVaArray = this.arrayClean(this.colorsArray, 'Red')
      this.textColor = this.tempArray[c];
      this.buttonArray.push(new answerButton (this.randomTemp, false, this.textColor))

      if (this.textColor == this.currentColor){
        this.finishCount++ ;
      }
    }
  } 

  timeCount(){
    this.levelTime+=1 ;
  }

  checkAnswer(colorValue:string, wordValue: string){
    let numberLeft = (this.finishCount - this.correctCount) - 1 ;

    if (this.currentQuestion == this.mainQuestionArray[0]){
    
    if (colorValue == this.currentColor){
      this.correctCount++ ;
      this.levelMessage='Good! You still have' + ' ' + numberLeft + ' ' + 'left';
    }
    else (this.wrongCount++ )
       }

    if (this.currentQuestion == this.mainQuestionArray[1]){
    
    if (wordValue == this.currentColor){
      this.correctCount++ ;
      this.levelMessage='Good! You still have' + ' ' + numberLeft + ' ' + 'left';
    }
    else (this.wrongCount++ )
       }
    
    if (this.correctCount == this.finishCount) {
      this.levelMessage = "Level Complete!"
      this.levelSeen = false ;
      this.restartSeen = true ;

    }
    clearInterval(this.t);
    this.levelScore = (this.correctCount*75 - this.wrongCount*25)
  }

  checkColorType(colorValue:string, wordValue:string){

  }

  getColor(value: string){
    switch (value){
      case 'Red':
        return '#fc2003'
      case 'Blue':
        return '#0b03fc'
      case 'Yellow':
        return '#fce703'
      case 'Green':
        return '#03fc0f'
      case 'Black':
        return '#000000'
      case 'Pink':
        return '#ff00b7'
      case 'Brown':
        return '#D2691E'

    }
  } 

  onRestart(){

    this.questionArray = [];
    this.tempArray = [];
    this.tempValueArray = [];
    this.buttonArray = [];

    this.correctCount = 0 ;
    this.wrongCount = 0 ;
    this.finishCount = 0 ;
    this.levelMessage = '';

    this.levelCount+=1
    this.levelSeen = true;
    this.restartSeen = false ;
    this.levelScore = 0; 

    this.currentColor = '';
    this.currentQuestion = '';

    let i = this.itemCount + this.itemCount/2

    this.getLevel(this.itemCount + this.itemCount / 4)

   
    this.start = this.end;
    this.end+=1 ;
    
  }

  ngOnInit() {
    
  }

}
