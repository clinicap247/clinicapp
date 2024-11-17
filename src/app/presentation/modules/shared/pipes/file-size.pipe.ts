import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'appFileSize',
  standalone: true,
})
export class FileSizePipe implements PipeTransform {
  transform(value: number, ...args: unknown[]): unknown {
    //Make a function to return a value from bytes to kilobytes on show to view
    if (value === 0) {
      return '0 B';
    }
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(value) / Math.log(k));

    return parseFloat((value / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
}
