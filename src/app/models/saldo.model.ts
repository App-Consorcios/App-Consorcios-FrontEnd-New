import { Concepto } from './concepto.model';

export class Saldo {
  constructor(public periodo: string,
              public concepto:Concepto,
              public descripcion:string,
              public monto:number){ }
}
