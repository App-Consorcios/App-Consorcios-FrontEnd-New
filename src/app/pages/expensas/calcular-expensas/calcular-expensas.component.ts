import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ExpensasService } from 'src/app/services/expensas/expensas.service';
import { Subscription } from 'rxjs';
import { UnidadFuncionalService } from 'src/app/services/unidad-funcional/unidad-funcional.service';
import { Concepto } from 'src/app/models/concepto.model';

@Component({
  selector: 'app-calcular-expensas',
  templateUrl: './calcular-expensas.component.html',
  styleUrls: ['./calcular-expensas.component.css']
})

export class CalcularExpensasComponent implements OnInit {
  unidadFuncionales:any[] = [];
  matriz:any;
  matrizCalculada:any;
  toggleCalcular:boolean = true;
  conceptos:Concepto[] =[];
  ufSuscription:Subscription;
  conceptosSubscription:Subscription;
  costos:any[] = [];
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
  }
  seleccion(evento){
    this.periodo = evento
  }
  recuperaSaldos(){

    let mes = this.periodo.getMonth()+1;
    let contador = mes.toString().length;
    let periodoActual =`${this.periodo.getFullYear()}-${('0'.repeat(2-contador)).concat(mes.toString())}`;
    this._exp.getSaldos(periodoActual).subscribe( saldos =>{
      this.saldos = saldos;
      let conceptos= []
      if(this.saldos.length>0){
        let cantConceptos = this.saldos[0].itemsGenerales.length;
        for(let i = 0; i<cantConceptos; i++){
          conceptos.push({nombre:this.saldos[0].itemsGenerales[i].conceptoNombre.nombre});
        }
        this.conceptoData = conceptos;
        this.tableData =  this.crearMatrizVacia();
        if(this.tableData.length>0) this.toggleCalcular = true;
      }else{
        this.tableData = []
        this.conceptoData = []
      }
    })
  }
  crearMatrizVacia(){
    let item:any = [];
    let matriz:any[] = [];

    if(this.saldos.length>0){
      let cantConceptos = this.saldos[0].itemsGenerales.length;
      let j
      for(let i = 0; i<cantConceptos; i++){
        item = [];
        for(j = 0; j < this.unidadFuncionales.length+1; j++){

          if(j<this.unidadFuncionales.length){
            item.push("");
          }else{
            item.push(this.saldos[0].itemsGenerales[i].monto)
          }
        }
        matriz.push(item);
      }
      console.log(matriz);
      return matriz;
    }
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
    let cantConceptos = this.saldos[0].itemsGenerales.length;
    expensasUFs.periodo = this.saldos[0].periodo;
    for(let i = 0; i<cantConceptos; i++){
      item = [];
      for(let j = 0; j < this.unidadFuncionales.length+1; j++){
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
    if(matriz.length>0){
      this.toggleCalcular = false;
    }
    expensasUFs.expensasUnidadesFuncionales.push(unfuncional);
    this.expensas =  expensasUFs;
    return matriz;
  }
  calcularNovedad(){
    if(this.saldos.length>0){
      this.tableData = this.createMatrizNovedad();
    }
  }
  guardarNovedad(){
    let mes = this.periodo.getMonth()+1;
    let contador = mes.toString().length;
    let periodoActual =`${this.periodo.getFullYear()}-${('0'.repeat(2-contador)).concat(mes.toString())}`;
    if(this.expensas!=undefined && this.expensas !=""){
      this._exp.getExpensas(periodoActual).subscribe( data =>{
          if(data.length==0){
            this._exp.postExpensas(this.expensas).subscribe( expensas =>{
              console.log(expensas);
              this.toggleCalcular = true;
            }),((error)=>{ console.log(error) });
          }
      });

    }
  }
}
interface SaldoTotales {
  nombre: string,
  monto: number
}
