import { Concepto } from './concepto.model';

export class ItemSaldo {
  constructor(public conceptoNombre:Concepto,
              public descripcion: string,
              public monto:number){ }
}
