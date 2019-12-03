import { Injectable } from '@angular/core';
import { SidebarService } from '../sidebar/siderbar.service';
import { SidebarComponent } from 'src/app/shared/sidebar/sidebar.component';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  menu:number = -1;
  submenu:number = -1;

  constructor(public _sidebar:SidebarService) { 

  }

  ngOnInit() {
  }
  cargarSubmenu(){
    // console.log(this.menu,this.submenu)
    let urlActiva =  window.location.href
  
    if(this.menu <0 && this.submenu <0){
      if(urlActiva.includes('expensas')){
        return this._sidebar.cargarMenu(1,1).action;
      }else if(urlActiva.includes('reuniones')){
        return this._sidebar.cargarMenu(2,1).action;
      }else{
        return this._sidebar.cargarMenu(0,1).action;
      } 
    }

     return this._sidebar.cargarMenu(this.menu,this.submenu).action;
  }
}
