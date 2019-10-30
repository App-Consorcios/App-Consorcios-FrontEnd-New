import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';
import Swal from 'sweetalert2';

declare function init_plugin();
declare const gapi:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email:string="";
  recuerdarme:boolean = false;
  usuario:Usuario;

  constructor(private _router:Router,
              public _auth:AuthService) { }

  ngOnInit() {

    init_plugin();
    let email = localStorage.getItem('email');
    let recordar  = localStorage.getItem('recordar')
    if(email) this.email = email;
    if(recordar = "true") this.recuerdarme = true;
  }
  ingresar(forma:NgForm){

    if(forma.invalid) return;
    this._auth.login(forma.control.value.email, forma.control.value.password,forma.value.recuerdarme)
    .subscribe( (resp:any) => {
      if(resp.valido){
        this.usuario = resp.usuario;
        this.usuario.password = '*******';
        this._auth.guardarStorage(this.usuario.id.toString(), this.usuario);
        this._router.navigate(['/panel']);
      }else{
        Swal.fire({
          type: 'error',
          title: 'Oops...',
          text: 'El usuario no existe!'
        })
      }

    });
  }
  navegar(){
    this._router.navigate(['/register'])
  }
}
