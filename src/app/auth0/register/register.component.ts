import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
import { Roles } from 'src/app/models/roles.model';
import { Usuarios } from 'src/app/config/usuarios';
declare function init_plugin();
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  roles:Roles[] = [];
  usuario:Usuario;
  forma:FormGroup
  usuariosCargados:any[]=[];
  constructor(public _auth:AuthService,
              public _router:Router) { }

  ngOnInit() {
    init_plugin();
    this._auth.cargarUsuarios().subscribe( (resp:any) =>{
      for(let user of resp){
        this.usuariosCargados.push(user.mail);
      }
      this._auth.buscarRoles()
          .subscribe( (resp:any) =>{
            this.roles = resp;
            this.cargarRoles();
            this.registrarMasivaDeUsuarios();
          });
    })


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
      [{nombre:"usuario"}]
    );
    if(this.usuariosCargados.indexOf(this.forma.value.email)<0){
      this._auth.crearUsuario(usuario)
      .subscribe( resp => {
          this.usuario = resp;
          this._router.navigate(['/login']);
      });
    }else{
      Swal.fire({
        type: 'error',
        title: 'Oops...',
        text: 'El mail ya existe!'
      })
    }
  }
  //Carga Manual de usuarios
  registrarMasivaDeUsuarios(){
    for(let user of Usuarios){
      if(this.usuariosCargados.indexOf(user.mail)<0){
        this._auth.crearUsuario(user)
        .subscribe( resp => {
            console.log(resp)
        });
      }
    }
  }
  navegar(){
    this._router.navigate(['/login'])
  }
  cargarRoles(){
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
}
