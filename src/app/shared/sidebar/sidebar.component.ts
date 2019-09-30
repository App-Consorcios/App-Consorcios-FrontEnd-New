import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/services/sidebar/siderbar.service';
import { NavbarService } from 'src/app/services/navbar/navbar.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
 item:any = '/unidad-funcional';
 usuario:any = {};
  constructor(public _sidebar:SidebarService,
              public _navabar:NavbarService,
              private _router:Router,
              private auth:AuthService) { }

  ngOnInit() {
    this.auth.userProfile$.subscribe( data =>{
      this.usuario = data;
      console.log(this.usuario);
    })
  }
  crearSubmenu(submenu:number,menu:number){
    this._navabar.menu = menu;
    this._navabar.submenu = submenu
    this.item = this._sidebar.menu[submenu].submenu[menu].url
  }

}
