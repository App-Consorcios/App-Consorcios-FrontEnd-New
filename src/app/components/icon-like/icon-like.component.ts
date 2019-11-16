import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-icon-like',
  templateUrl: './icon-like.component.html',
  styleUrls: ['./icon-like.component.css']
})
export class IconLikeComponent implements OnInit {
  like:number = 0;
  @Input('up') public up:boolean = true;
  @Input('down') public down:boolean = false;

  constructor() { }

  ngOnInit() {
  }

}
