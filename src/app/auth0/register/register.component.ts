import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
import { Roles } from 'src/app/models/roles.model';
declare function init_plugin();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  roles:Roles[] = [];
  usuario:Usuario;
  forma:FormGroup

  constructor(public _auth:AuthService,
              public _router:Router) { }

  ngOnInit() {
    init_plugin();
    this._auth.buscarRoles()
        .subscribe( (resp:any) =>{
          this.roles = resp;
          this.cargarRoles();
        });

    this.forma = new FormGroup({
      nombre: new FormControl(null, Validators.required),
      apellido: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.email,Validators.required]),
      password: new FormControl(null, Validators.required),
      password2: new FormControl(null, Validators.required),
      condiciones: new FormControl(false)
    },{ validators: this.sonIguales('password','password2') });
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
      this.forma.value.apellido,
      this.forma.value.password,
      this.forma.value.email,
      this.roles.filter(data => {return data.nombre == "usuario"})
    );
    this._auth.crearUsuario(usuario)
    .subscribe( resp => {
        this.usuario = resp;
        this._router.navigate(['/login']);
    });
  }
  navegar(){
    this._router.navigate(['/login'])
  }
  cargarRoles(){
    console.log(this.roles)
    let roles = [
      {
        nombre:"admin"
      },
      {
       nombre:"propietario"
      },
      {
        nombre:"inquilino"
      },
      {
        nombre:"usuario"
      }]
    for(let rol of this.roles){
      roles = roles.filter(data=> data.nombre != rol.nombre);
    }
    if(roles.length > 0){
      for(let rol of roles){
        this._auth.crearRoles(rol).subscribe( resp=>{console.log(resp)})
      }
    }

  }
  // this.forma.value.pais

}
