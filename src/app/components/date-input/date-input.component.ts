import 'rxjs/add/operator/take';

import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as moment from 'moment';

import * as fromRoot from '../../reducers';
import * as LayoutActions from '../../actions/layout.actions';

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
            sameDay: '[Today]',
            nextDay: '[Tomorrow]',
            nextWeek: 'dddd',
            lastDay: '[Yesterday]',
            lastWeek: '[Last] dddd',
            sameElse: 'DD/MM/YYYY'
        }));
    }

    incrementDay(value: number) {
        this.date$
            .take(1)
            .map(date => moment(date).add(value, 'day'))
            .do(date => this.store.dispatch(new LayoutActions.SetDate(date.toDate())))
            .subscribe();
    }

}
