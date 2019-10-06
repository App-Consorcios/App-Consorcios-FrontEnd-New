import { Concepto } from './concepto.model';
import { Expensa } from './expensa.model';

export class ItemExpensa {
  constructor(public id: string,
              public numero: number,
              public concepto:Concepto,
              public monto:number){ }
}
