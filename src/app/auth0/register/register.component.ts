import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
declare function init_plugin();
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  forma:FormGroup;

  constructor(public _auth:AuthService,
              public _router:Router) { }

  ngOnInit() {
    init_plugin();
    this.forma = new FormGroup({
      nombre: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.email,Validators.required]),
      password: new FormControl(null, Validators.required),
      password2: new FormControl(null, Validators.required),
      condiciones: new FormControl(false)
    },{ validators: this.sonIguales('password','password2') });
    this.forma.setValue({
      nombre: "test 1",
      email: "test1@test.com",
      password: "123456",
      password2: "123456",
      condiciones: true
    });
  }
  sonIguales(campo1:string,campo2:string){
    return (group:FormGroup) =>{
      let pass1:string = group.controls[campo1].value;
      let pass2:string = group.controls[campo2].value;
      if(pass1 === pass2){
        return null
      }
      return {
        sonIguales:true
      };
    };
  }
  registrarUsuario(){
    if(this.forma.invalid){
      return;
    }
    if(!this.forma.value.condiciones){
      // swal('Importante', 'Debe aceptar las condiciones', 'warning');
    }

    const usuario = new Usuario(
      this.forma.value.nombre,
      this.forma.value.email,
      this.forma.value.password
    );
    this._auth.crearUsuario(usuario)
    .subscribe( resp => this._router.navigate(['/login']));
  }
  navegar(){
    this._router.navigate(['/login'])
  }
  // this.forma.value.pais

}
