import { Usuario } from '.';

export class UnidadFuncional {
  constructor(public id:number,
              public codigo: string,
              public ubicacion: string,
              public descripcion: string,
              public tamanio: number,
              public prorrateo: number,
              public propietario: any,
              public inquilino: any){ }
}
