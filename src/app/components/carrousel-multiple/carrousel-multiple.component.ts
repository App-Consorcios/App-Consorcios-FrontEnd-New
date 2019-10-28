import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-carrousel-multiple',
  templateUrl: './carrousel-multiple.component.html',
  styleUrls: ['./carrousel-multiple.component.css']
})
export class CarrouselMultipleComponent implements OnInit {
  @Input('content') public cards:any[] = [];
  inicio:number = 0;
  fin: number = 1;
  color:string[]=[
    '#9C27B0',
    '#F44336',
    '#E91E63',
    '#7E57C2',
    '#5C6BC0',
    '#1E88E5',
    '#4FC3F7',
    '#26C6DA',
    '#00897B',
    '#43A047',
    '#558B2F',
    '#827717',
    '#FDD835',
    '#6D4C41'
  ];
  constructor() {
  }

  ngOnInit() {
  }
  recalcularCards(){
    this.cards = this.cards.filter(data=>{
      let regex = new RegExp('DocuWEB','i')
      if(!regex.test(data.PATH)){
        return data;
      }
    })
    return this.cards.slice(this.inicio,this.fin)
  }
  next(){
    console.log(this.cards.length)
    if(this.cards.length%3 == 0 && this.fin>this.cards.length){
      this.inicio+= 3;
      this.fin+=3;
      this.recalcularCards();
    }else{
      if(this.cards.length<this.fin+3){
       let sobra = (this.fin+3) - this.cards.length;
       this.inicio += 3-sobra;
       this.fin = this.cards.length;
       this.recalcularCards();

     }
    }
  }
  prev(){
    if(this.cards.length%3 == 0 && (this.inicio-3)>0){

      this.inicio-= 3;
      this.fin-=3;
      this.recalcularCards();
    }else{
      if(0>(this.inicio-3)){
       let sobra = 0 - (this.inicio-3);
       this.inicio = 0;
       this.fin -= (3-sobra);
     }
    }
  }
}
