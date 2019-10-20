import { Component, OnInit } from '@angular/core';
import { NavbarService } from 'src/app/services/navbar/navbar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-acciones',
  templateUrl: './menu-acciones.component.html',
  styleUrls: ['./menu-acciones.component.css']
})
export class MenuAccionesComponent implements OnInit {

  constructor(public _navbar:NavbarService,
              private _router:Router) { }

  ngOnInit() {
  }
  isActive(url): boolean {
      return this._router.url.includes(url);
  }

}
