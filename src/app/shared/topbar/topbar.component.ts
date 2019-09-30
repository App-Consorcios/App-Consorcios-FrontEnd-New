import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {
  @Input('panel') public panel:boolean = false;
  usuario:any = {};

  constructor(public auth: AuthService) {
    this.auth.userProfile$.subscribe( data =>{
      this.usuario = data;
      console.log(this.usuario);
    })

  }

  ngOnInit() {
    this.auth.userProfile$.subscribe( data =>{
      this.usuario = data;
      console.log(this.usuario);
    })

  }

}
