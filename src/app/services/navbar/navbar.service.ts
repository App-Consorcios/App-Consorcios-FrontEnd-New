import { Injectable } from '@angular/core';
import { SidebarService } from '../sidebar/siderbar.service';
import { SidebarComponent } from 'src/app/shared/sidebar/sidebar.component';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  menu:number = -1;
  submenu:number = -1;
  constructor(public _sidebar:SidebarService) { }

  ngOnInit() {
  }
  cargarSubmenu(){
    if(this.menu <0 && this.submenu <0){
      return this._sidebar.cargarMenu(0,1).action;
    }
    return this._sidebar.cargarMenu(this.menu,this.submenu).action;
  }
}
