import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ExpensasService } from 'src/app/services/expensas/expensas.service';
import { Subscription } from 'rxjs';
import { UnidadFuncionalService } from 'src/app/services/unidad-funcional/unidad-funcional.service';
import { Concepto } from 'src/app/models/concepto.model';
import { NgForm, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-calcular-expensas',
  templateUrl: './calcular-expensas.component.html',
  styleUrls: ['./calcular-expensas.component.css']
})
export class CalcularExpensasComponent implements OnInit {
  // unidadFuncionales:any[] = [];
  unidadFuncionales:any
  matriz:any;
  matrizCalculada:any;
  conceptos:Concepto[] =[];
  ufSuscription:Subscription;
  conceptosSubscription:Subscription;
  costos:any[] = [];
  forma:FormGroup;
  mensaje:string;
  constructor(private _exp:ExpensasService,
              private _uf:UnidadFuncionalService) {


  }

  ngOnInit() {

    this.ufSuscription = this._uf.getUnidades().subscribe(data=>{
      this.unidadFuncionales  = data;
    });
    console.log("UFS - ", this.unidadFuncionales);

    this.recuperaSaldos()
    let formControl:any = []
    for(let i = 0;i<this.conceptos.length;i++){
      formControl.push(new FormControl(this.costos[i]))
    }

    this.forma = new FormGroup({
      'costos': new FormArray(formControl)
    });
    console.log("FORMA COSTOS - ", this.forma);

  }
  recuperaSaldos(){
    this._exp.getSaldos().subscribe( saldos =>{
      let monto:any[] = [];
      let conceptoSaldo:any[] = [];
      for(let costo of saldos){
        monto.push(costo.monto);
        conceptoSaldo.push(costo.concepto);
      }
      this.costos = monto;
      const costosSUM = this.costos.reduce((a, b) => a + b, 0)
      this.costos.push(costosSUM)

      this.conceptos = conceptoSaldo;
      this.conceptos.push({nombre: "Totales", tipo: {nombre: "Totales", color: "Rojo"}})

    })
  }
  modificarSaldos(){
    let saldos:SaldoTotales[] = []
    for(let i = 0;i<this.forma.value.costos.length;i++){
        let valor = this.forma.value.costos[i]
        saldos.push({nombre:this.conceptos[i].nombre,monto:parseInt(valor,10)})
    }
    this._exp.putSaldos(saldos).subscribe( payload =>{
      this.mensaje = payload.message;
    })
  }
  calcularNovedad(){
    this.recuperaSaldos();
    console.log("calcularNovedad COSTOS - ", this.costos)



    this.matriz = this._exp.createMatrizNovedad();
    console.log("MATRIZ", this.matriz);

    // this.matrizCalculada = this.matriz



    // for(let UF=0; UF < this.matriz.length; UF++){
    //   for(let i = 0; i < this.matriz.UF.length; i++){
    //     this.matrizCalculada[i][UF] = this.costos[i] * this.matriz[i][UF]
    //   }
    // }

  }


}
interface SaldoTotales {
  nombre: string,
  monto: number
}
