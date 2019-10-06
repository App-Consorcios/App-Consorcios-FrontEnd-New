import { Concepto } from './concepto.model';

export class Saldo {
  constructor(public concepto:Concepto,
              public monto:number){ }
}
