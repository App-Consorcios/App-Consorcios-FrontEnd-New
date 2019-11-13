import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sigla'
})
export class SiglaPipe implements PipeTransform {

  transform(value: string, limite: string): any {
    let limit = parseInt(limite);
    return value.length > limit ? value.toUpperCase().substring(0,limit) :   value;
  }

}
