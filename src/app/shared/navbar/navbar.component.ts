import { Component, OnInit } from '@angular/core';
import { NavbarService } from 'src/app/services/navbar/navbar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public _navbar:NavbarService,
              private _router:Router) { }

  ngOnInit() {


  }

  isActive(url): boolean {
      return this._router.url.includes(url);
  }
}
