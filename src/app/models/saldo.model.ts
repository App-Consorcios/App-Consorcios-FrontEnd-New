import { Concepto } from './concepto.model';
import { ItemSaldo } from './item-saldo.model';

export class Saldo {
  constructor(public periodo: string,
              public itemsGenerales:ItemSaldo[]
              ){ }
}
