import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'keyIdToColor'
})
export class KeyIdToColorPipe implements PipeTransform {

  transform(value: number): string {
    // return enumSource[value];
    return ''
  }

}
