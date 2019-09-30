import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-unidad-funcional',
  templateUrl: './unidad-funcional.component.html',
  styleUrls: ['./unidad-funcional.component.css']
})
export class UnidadFuncionalComponent implements OnInit {

  constructor(public router:Router) { }

  ngOnInit() {
  }

}
