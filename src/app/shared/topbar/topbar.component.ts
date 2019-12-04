import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Usuario } from 'src/app/models';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {
  @Input('panel') public panel:boolean = false;
  grid:boolean=true;
  usuario:Usuario

  constructor(public auth:AuthService,private _router:Router,private activatedRoute: ActivatedRoute) {
    this.usuario = JSON.parse(localStorage.getItem("usuario"));
     activatedRoute.params.pipe(map(data => {console.log(data)}))

  }

  ngOnInit() {

  }
  navegar(){
    return this._router.navigate(['/panel']);
  }


}
