import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { SidebarService } from 'src/app/services/sidebar/siderbar.service';
import { Router, ChildActivationEnd, NavigationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit {
  titulo:string;
  icono:string;
  mySubscription:Subscription;
  constructor(public _sidebar:SidebarService,
              private changeDetector : ChangeDetectorRef,
              private _router:Router) {
                this.changeDetector.markForCheck();
                this.getDataRoute()
                .subscribe((data:any)=>{
                  for(let m of this._sidebar.menu){
                    for( let sub of m.submenu){
                      if(sub.url === '/'+data.path){
                        this.icono = sub.icono.replace(' menu-icon','')
                        this.titulo = sub.titulo
                      }
                    }
                  }

                });
    this.changeDetector.markForCheck();
    this._router.routeReuseStrategy.shouldReuseRoute = function () {
        return false;
     };
     this.mySubscription = this._router.events.subscribe((event) => {
       if (event instanceof NavigationEnd) {
         this._router.navigated = false;
       }
    });
  }

  ngOnInit() {

  }
  getDataRoute(){
    return this._router.events
        .pipe(
          filter( evento => evento instanceof ChildActivationEnd ),
          filter( (evento:ChildActivationEnd) => evento.snapshot.parent != null),
          filter( (evento:ChildActivationEnd) => evento.snapshot.url.length > 0),
          map( data => data.snapshot.routeConfig)
        )
  }
}
