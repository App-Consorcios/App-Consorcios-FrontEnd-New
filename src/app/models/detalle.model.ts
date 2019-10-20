import { Concepto } from './concepto.model';

export class Detalle {
  constructor( public nombre:Concepto,
               public descripcion:string,
               public monto:number){ }
}
