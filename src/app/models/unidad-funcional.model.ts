import { Usuario } from '.';

export class UnidadFuncional {
  constructor(public codigo: string,
              public ubicacion: string,
              public tamanio: number,
              public prorrateo: number,
              public propietario: Usuario){ }
}
