import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/services/sidebar/siderbar.service';
import { NavbarService } from 'src/app/services/navbar/navbar.service';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Roles } from 'src/app/models/roles.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  item:any = '/unidad-funcional';
  position:any[]=[];
  usuario:Usuario;
  roles:Roles[];
  constructor(public _sidebar:SidebarService,
              public _navabar:NavbarService,
              private _router:Router,public _auth:AuthService) {

   }

  ngOnInit() {
    this.usuario = JSON.parse(localStorage.getItem("usuario"));
  }
  crearSubmenu(submenu:number,menu:number){
    this._navabar.menu = menu;
    this._navabar.submenu = submenu;
    this.item = this._sidebar.menu[submenu].submenu[menu].url
  }

  isActive(url): boolean {
      return this._router.url.includes(url);
  }
}
