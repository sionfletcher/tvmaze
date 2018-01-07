import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RatingComponent } from '../rating/rating.component';

@Component({
  selector: 'app-rating-enumerated',
  templateUrl: './rating-enumerated.component.html',
  styleUrls: ['./rating-enumerated.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RatingEnumeratedComponent extends RatingComponent { }
