import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VerUnidadService {
  private codigo:string = 'PB-01';
  private prorrateo:number;
  private tamanio:number;
  private ubicacion:string;
  private descripcion:string

  constructor() { }

  public setCodigo(codigo:string){
    this.codigo = codigo;
  }
  public getCodigo():string{
    return this.codigo;
  }
  public setProrrateo(prorrateo:number){
    this.prorrateo = prorrateo;
  }
  public getProrrateo():number{
    return this.prorrateo;
  }
  public setTamanio(tamanio:number){
    this.tamanio = tamanio;
  }
  public getTamanio():number{
    return this.tamanio;
  }
  public setUbicacion(ubicacion:string){
    this.ubicacion = ubicacion;
  }
  public getUbicacion():string{
    return this.ubicacion;
  }
  public setDescripcion(descripcion:string){
    this.descripcion = descripcion;
  }
  public getDescripcion():string{
    return this.descripcion;
  }
}
