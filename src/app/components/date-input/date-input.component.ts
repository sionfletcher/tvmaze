import 'rxjs/add/operator/take';

import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as moment from 'moment';
import * as fromRoot from '../../reducers';
import * as LayoutActions from '../../actions/layout.actions';

function dateSpan(now) {
    const a = this;
    const b = moment(a).add(6, 'days');
    return `[${a.format('Do MMM')} \u2014 ${b.format('Do MMM')}]`;
}

@Component({
    selector: 'app-date-input',
    templateUrl: './date-input.component.html',
    styleUrls: ['./date-input.component.scss']
})
export class DateInputComponent implements OnInit {

    date$: Observable<Date>;
    dateString$: Observable<string>;

    constructor(
        private store: Store<fromRoot.State>
    ) { }

    ngOnInit() {
        this.date$ = this.store.select(fromRoot.getDate);
        this.dateString$ = this.date$.map(date => moment(date).calendar(null, {
            sameDay: '[This Week]',
            nextDay: '[This Week]',
            nextWeek: '[Next Week]',
            lastDay: '[This Week]',
            lastWeek: '[This Week]',
            sameElse: dateSpan
        }));
    }

    incrementWeek(value: number) {
        this.date$
            .take(1)
            .map(date => moment(date).add(value, 'week'))
            .do(date => this.store.dispatch(new LayoutActions.SetDate(date.toDate())))
            .subscribe();
    }

}
