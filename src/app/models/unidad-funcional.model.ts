import { Usuario } from '.';

export class UnidadFuncional {
  constructor(public nro:number,
              public codigo: string,
              public ubicacion: string,
              public tamanio: number,
              public prorrateo: number,
              public propietario: Usuario){ }
}
