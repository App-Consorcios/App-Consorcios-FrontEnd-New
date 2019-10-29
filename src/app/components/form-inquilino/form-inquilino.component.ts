import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-inquilino',
  templateUrl: './form-inquilino.component.html',
  styleUrls: ['./form-inquilino.component.css']
})
export class FormInquilinoComponent implements OnInit {
    forma:FormGroup;
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
  }

}
