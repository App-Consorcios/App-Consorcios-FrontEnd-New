import { UnidadFuncional } from './unidad-funcional.model';
import { ItemExpensa } from './item-expensa.model';

export class Expensa {
  constructor(public id: string,
              public periodo: string,
              public unidad: UnidadFuncional,
              public total: number,
              public item: ItemExpensa[]){ }
}
