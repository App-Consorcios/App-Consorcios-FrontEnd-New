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
  unidadFuncionales:any[] = [];
  matriz:any;
  matrizCalculada:any;
  conceptos:Concepto[] =[];
  ufSuscription:Subscription;
  conceptosSubscription:Subscription;
  costos:any[] = [];
  forma:FormGroup;
  mensaje:string;
  expensas:any;
  displayedColumns:any[] = [];
  columnDinamic:any[] = [];
  tableData:any[] = [];
  conceptoData:any[]=[];
  saldos:any;
  periodo:Date = new Date();
  // ['name', 'position', 'weight', 'symbol', 'position', 'weight', 'symbol', 'star'];
  // dataSource = ELEMENT_DATA;
  constructor(private _exp:ExpensasService,
              private _uf:UnidadFuncionalService) {}

  ngOnInit() {

    this.ufSuscription = this._uf.getUnidades().subscribe((data:any)=>{
      // this.unidadFuncionales  = data.filter( unidades =>{
      //   console.log(unidades.inquilino != undefined && unidades.propietario != undefined)
      //   return unidades.inquilino != undefined && unidades.propietario != undefined
      // });
      this.unidadFuncionales = data;
      for(let col of this.unidadFuncionales){
        this.displayedColumns.push(col.codigoDepartamento.toString());
      }
      this.displayedColumns.push("TOTALES")
      for(let i = 0;i<this.displayedColumns.length-1;i++){
        this.columnDinamic.push(this.displayedColumns[i]);
      }
      this.recuperaSaldos();
    });


    let formControl:any = []
    for(let i = 0;i<this.conceptos.length;i++){
      formControl.push(new FormControl(this.costos[i]))
    }

    this.forma = new FormGroup({
      'costos': new FormArray(formControl)
    });
    // console.log("FORMA COSTOS - ", this.forma);

  }
  recuperaSaldos(){
    let mes = this.periodo.getMonth()+1;
    let contador = mes.toString().length;
    let periodoActual =`${this.periodo.getFullYear()}-${('0'.repeat(2-contador)).concat(mes.toString())}`;
    this._exp.getSaldos(periodoActual).subscribe( saldos =>{
      this.saldos = saldos;
      this.tableData = this.createMatrizNovedad();
      console.log(this.tableData);
        // console.log(this.matriz);
      // let monto:any[] = [];
      // let conceptoSaldo:any[] = [];
      // for(let costo of saldos){
      //   monto.push(costo.monto);
      //   conceptoSaldo.push(costo.concepto);
      // }
      // this.costos = monto;
      // const costosSUM = this.costos.reduce((a, b) => a + b, 0)
      // this.costos.push(costosSUM)

      // this.conceptos = conceptoSaldo;
      // this.conceptos.push({nombre: "Totales", tipo: {nombre: "Totales", color: "Rojo"}})

    })
  }
  createMatrizNovedad(){
    let matriz:any[] = [];
    let item:any = [];
    let unidadFuncional = {
        codigoDepartamento: "",
        items: []
    }
    let expensasUFs =  {
        periodo: "",
        expensasUnidadesFuncionales: []
    }
    let unfuncional:any[]=[];
    if(this.saldos.length>0){
      let cantConceptos = this.saldos[0].itemsGenerales.length;
      let j
      expensasUFs.periodo = this.saldos[0].periodo;
      for(let i = 0; i<cantConceptos; i++){
        item = [];
        for(j = 0; j < this.unidadFuncionales.length+1; j++){
          if(j<this.unidadFuncionales.length){
          let uf = unfuncional.filter((data:any)=>{return (data.codigoDepartamento.toString()).trim() == this.unidadFuncionales[j].codigoDepartamento.toString().trim()});
            if(uf.length==0){
              unfuncional.push({
                codigoDepartamento : this.unidadFuncionales[j].codigoDepartamento,
                items: [{conceptoNombre: this.saldos[0].itemsGenerales[i].conceptoNombre.nombre,
                         monto: this.saldos[0].itemsGenerales[i].monto * this.unidadFuncionales[j].prorrateo}]
              })
            }else{
              if(i<cantConceptos){
                let item = uf[0].items.filter(data=>{ return (data.conceptoNombre.toString()).trim() === this.saldos[0].itemsGenerales[i].conceptoNombre.nombre.toString().trim();});
                if(item.length==0){
                  uf[0].items.push({conceptoNombre: this.saldos[0].itemsGenerales[i].conceptoNombre.nombre,
                                    monto: this.saldos[0].itemsGenerales[i].monto  * this.unidadFuncionales[j].prorrateo});
                  }
                }
              }
            }
          if(j<this.unidadFuncionales.length){
            let concept = this.conceptoData.filter(data=>{return data.nombre == this.saldos[0].itemsGenerales[i].conceptoNombre.nombre});
            if(concept.length==0){
              this.conceptoData.push({nombre:this.saldos[0].itemsGenerales[i].conceptoNombre.nombre});
            }
            item.push(this.unidadFuncionales[j].prorrateo * this.saldos[0].itemsGenerales[i].monto);
          }else{
            item.push(this.saldos[0].itemsGenerales[i].monto)
          }
        }
        matriz.push(item);
      }
      this.expensas =  expensasUFs.expensasUnidadesFuncionales.push(unfuncional);
    }
    return matriz;
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
    // this.recuperaSaldos();
    // console.log("calcularNovedad COSTOS - ", this.costos)
    this.tableData = this.createMatrizNovedad();
    console.log(this.tableData)
        console.log(this.conceptoData)
    // console.log("MATRIZ", this.matriz);

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
