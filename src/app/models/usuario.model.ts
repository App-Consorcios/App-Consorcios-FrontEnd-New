import { Roles } from './roles.model';

export class Usuario {
  constructor(public nombre:string,
              public apellido:string,
              public password:string,
              public mail:string,
              public roles:Roles[],
              public id?:string,
              public imagen?:string,
              public google?:boolean){ }
}
