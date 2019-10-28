import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../models';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit {
  usuario:Usuario;
  constructor(public _router:Router) {
  }

  ngOnInit() {
    this.usuario = JSON.parse(localStorage.getItem("usuario"));
  }
  navegar(){
    return this._router.navigate(['/unidad-funcional']);
  }

}
