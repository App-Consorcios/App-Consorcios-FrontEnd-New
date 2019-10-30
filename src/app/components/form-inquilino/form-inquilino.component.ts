import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Usuario } from 'src/app/models';

@Component({
  selector: 'app-form-inquilino',
  templateUrl: './form-inquilino.component.html',
  styleUrls: ['./form-inquilino.component.css']
})
export class FormInquilinoComponent implements OnInit {
    forma:FormGroup;
    @Input('usuario') public usuario:Usuario;
    Usuario:object = {
    nombre:"",
    apellido:"",
    rol:"",
    contacto:{
      email: "",
      password: ""
    }
  }
  constructor() {
    this.forma = new FormGroup({
      'nombre': new FormControl(''),
      'apellido': new FormControl(''),
      'rol': new FormControl(''),
      'contacto': new FormGroup({
        'email': new FormControl(''),
        'password': new FormControl('')
      })
    })

  }

  ngOnInit() {
    this.forma.controls['nombre'].setValue(this.usuario.nombre);
    this.forma.controls['apellido'].setValue(this.usuario.apellido);
    this.forma.controls['rol'].setValue(this.usuario.roles[0].nombre);
    // this.forma.controls['contacto'].controls['email'].setValue(this.usuario.mail);
    // this.forma.controls['contacto'].controls['password'].setValue('*******');

  }

}
