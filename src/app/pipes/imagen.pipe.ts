import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: string = 'usuario'): any {


    let url = URL_SERVICIOS + '/imagen'
    if(!img){
      return url+'/usuarios/66666666'
    }
    if(img.indexOf('https://') >= 0){
      return img;
    }
    switch(tipo){
      case 'usuario':
        url+='/usuarios/'+img;
        break;
      case 'medico':
        url+='/medicos/'+img;
        break;
     case 'hospital':
        url+='/hospitales/'+img;
        break;
     default:
         url+='/usuarios/66666666'
        break;
    }
    return url;
  }

}
