import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';

declare function init_plugin();
declare const gapi:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email:string;
  recuerdarme:boolean = false;

  constructor(private _router:Router,
              public _auth:AuthService) { }

  ngOnInit() {
    init_plugin();
  }
  ingresar(forma:NgForm){

    if(forma.invalid) return;
    let usuario = new Usuario(null,forma.value.email,forma.value.password);
    this._auth.login(usuario,forma.value.recuerdame)
    .subscribe( resp => this._router.navigate(['/unidad-funcional']));
  }
  navegar(){
    this._router.navigate(['/register'])
  }
}
