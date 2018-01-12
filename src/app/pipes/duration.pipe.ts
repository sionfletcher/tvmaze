import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'duration'
})
export class DurationPipe implements PipeTransform {

    transform(value: number): any {
        if (value < 60) {
            return value + ' minutes';
        } else {
            const hours = Math.floor((value / 60) * 2) / 2;
            return hours + ((hours === 1) ? 'hour' : ' hours');
        }
    }

}
