import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterClient',
  standalone: true,
})
export class FilterClientPipe implements PipeTransform {
  transform(array: any, filterString: string, property: string): any {

    if (filterString) {
      let filted: any[] = [];

      for (let persona of array) {

        if (persona[property].toLowerCase().includes(filterString.toLowerCase())) filted.push(persona);
      }
      return filted;
    } else {
      return array;
    }
  }
}
