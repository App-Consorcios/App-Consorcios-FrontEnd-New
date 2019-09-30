import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit {

  constructor(public _router:Router) { }

  ngOnInit() {
  }
  navegar(){
    return this._router.navigate(['/unidad-funcional']);
  }

}
