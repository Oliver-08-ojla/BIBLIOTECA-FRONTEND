import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterBook',
  standalone: true,
})
export class FilterBookPipe implements PipeTransform {
  transform(array: any, filterString: string, property: string, property2: string): any {

    if (filterString) {
      let filted: any[] = [];
      for (let persona of array) {

        if (persona[property].toLowerCase().includes(filterString.toLowerCase())) filted.push(persona);
        if (persona[property2].toLowerCase().includes(filterString.toLowerCase())) filted.push(persona);
      }
      return filted;
    } else {
      return array;
    }
  }
}
