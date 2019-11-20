import { Injectable } from '@angular/core';
import { UnidadFuncional } from 'src/app/models/unidad-funcional.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class UnidadFuncionalService {
  // unidadFuncionales:UnidadFuncional[] = [
  //   {
  //     id: 0,
  //     codigo: 'PB-01',
  //     ubicacion:'FI-PB',
  //     descripcion:'Frente izquierdo, planta baja ',
  //     tamanio: 42,
  //     prorrateo: 0.07,
  //     propietario:{
  //       nombre: "Lucas",
  //       apellido: "Ganzoroli",
  //       password: "123456",
  //       mail: "lganzoroli@gmail.com",
  //       imagen: "",
  //       roles: [
  //         {
  //           nombre: "propietario"
  //         }
  //       ]
  //     },
  //     inquilino:{
  //       nombre: "Alberto",
  //       apellido: "Rodriguez",
  //       password: "123456",
  //       mail: "arodriguez@gmail.com",
  //       imagen: "",
  //       roles: [
  //           {
  //             nombre: "inquilino"
  //           }
  //         ]
  //     }
  //   },
  //   {
  //       id: 1,
  //       codigo: 'PB-02',
  //       ubicacion:'FD-PB',
  //       descripcion:'Frente derecho, planta baja',
  //       tamanio: 60,
  //       prorrateo: 0.10,
  //       propietario:null,
  //       inquilino:null
  //     },
  //     {
  //         id: 2,
  //         codigo: 'P2-01',
  //         ubicacion:'FD-P2',
  //         descripcion:'Frente derecho, segundo piso',
  //         tamanio: 60,
  //         prorrateo: 0.10,
  //         propietario:null,
  //         inquilino:null
  //     },
  //     {
  //         id: 3,
  //         codigo: 'P2-02',
  //         ubicacion:'FI-P2',
  //         descripcion:'Frente izquierdo, segundo piso',
  //         tamanio: 60,
  //         prorrateo: 0.10,
  //         propietario:{
  //             id: 6,
  //             nombre: "lucas",
  //             apellido: "Perdroza",
  //             mail: "mpedroza@gmail.com",
  //             imagen: "",
  //             roles: [
  //                 {
  //                     nombre: "propietario"
  //                 }
  //             ]
  //         },
  //         inquilino:null
  //     },
  //     {
  //         id: 4,
  //         codigo: 'P3-01',
  //         ubicacion:'FI-P3',
  //         descripcion:'Frente izquierdo, Tercer piso',
  //         tamanio: 60,
  //         prorrateo: 0.10,
  //         propietario:null,
  //         inquilino:{
  //           id: 7,
  //           nombre: "Martin",
  //           apellido: "Cañete",
  //           mail: "mcanete@gmail.com",
  //           imagen: "",
  //           roles: [
  //               {
  //                   nombre: "inquilino"
  //               }
  //           ]
  //         }

  //     }
  //   ]

  constructor(private http:HttpClient) { }
  
  // getUnidades():Observable<any>{
  //  return new Observable(unidadFuncionales =>{
  //    unidadFuncionales.next(this.unidadFuncionales);
  //   });
  // }

  getUnidades(){
    let url = URL_SERVICIOS+'/unidades-funcionales';
    let servicio = this.http.get(url)
    console.log("GET UFS - ", servicio);
    return servicio
   }


  crearUnidad(unidadFuncional:any){

    
    let url = URL_SERVICIOS+'/unidad-funcional';
    console.log("URL - ", url);
    
    var headers = new HttpHeaders({
      "Content-Type": "application/json"
    });

    console.log("SERVICE CREAR UF - ", unidadFuncional);
    
    let UF = {
       "codigoDepartamento": unidadFuncional.codigoDepartamento,
       "descripcionDepartamento": unidadFuncional.descripcionDepartamento,
       "metrosCuadrados": unidadFuncional.metrosCuadrados,
       "prorrateo": unidadFuncional.prorrateo,
      "codigoUbicacion": unidadFuncional.ubicacion.codigoUbicacion,
      "descripcionUbicacion": unidadFuncional.ubicacion.descripcionUbicacion
  }

    console.log("SERVICE CREAR UF - ", UF);    
    console.log("JSON - ", JSON.stringify(UF));
    
    return this.http.post(url,JSON.stringify(UF),{headers: headers}).subscribe(
      (response) => console.log(response),
      (error) => console.log(error))


/*

    let url = URL_SERVICIOS+'/rol'
    var headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
   return this.http.post<Roles>(url,JSON.stringify(rol),{headers: headers})




  asignarRol(userId:any,roles:Roles[]){
    let url = URL_SERVICIOS;
    var headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
    url+=`/usuario?id=${userId}`

    return this.http.put(url,JSON.stringify(roles),{headers: headers});
  }*/



  }

  asignarUnidad(){
    //PUT
  }

}
