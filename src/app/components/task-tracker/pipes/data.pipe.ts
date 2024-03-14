import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'data',
  standalone: true
})
export class DataPipe implements PipeTransform {

  transform(data: string): string {
    return data.substring(0,10);
  }

}
