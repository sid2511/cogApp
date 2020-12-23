export class level {
    lvlNo: number ;
    totalScore: number ;
    scoreReq: number ; 
    elementCount: number ;
    colorPool: string[];
    wordPool: string[]
    question: string; //to be removed
    type: number;
    
    
    constructor (lvlNo:number, totalScore:number, scoreReq: number, elementCount:number, colorPool: string[],wordPool:string[], question:string, type:number){
       this.lvlNo = lvlNo ;
       this.totalScore = totalScore ;
       this.scoreReq = scoreReq ;
       this.elementCount = elementCount ;
       this.colorPool = colorPool ;
       this.wordPool = wordPool ;
       this.question = question;
       this.type = type ;
    }
}