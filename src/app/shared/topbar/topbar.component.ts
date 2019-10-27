import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Usuario } from 'src/app/models';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {
  @Input('panel') public panel:boolean = false;
  usuario:Usuario

  constructor(public auth:AuthService) {
    this.usuario = JSON.parse(localStorage.getItem("usuario"));

  }

  ngOnInit() {

  }

}
