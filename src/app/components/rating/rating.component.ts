import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-rating',
    templateUrl: './rating.component.html',
    styleUrls: ['./rating.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RatingComponent {

    @Input() rating: number;

    get outOfFive() {
        return Math.round((this.rating / 2) * 10) / 10;
    }

    get rounded() {
        return Math.round(this.outOfFive);
    }

}
