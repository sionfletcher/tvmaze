import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/switchMap';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect, toPayload } from '@ngrx/effects';

import { TvmazeService } from '../services/tvmaze.service';

import * as fromRoot from '../reducers/';
import * as ScheduleActions from '../actions/schedule.actions';

@Injectable()
export class ScheduleEffects {

    constructor(
        private actions$: Actions,
        private store: Store<fromRoot.State>,
        private tvmazeService: TvmazeService
    ) { }

    @Effect()
    load$: Observable<Action> = this.actions$
        .ofType(ScheduleActions.LOAD)
        .switchMap(() => {

            // This will update the schedule store whenever
            // the date / country code is changed
            return Observable.combineLatest(
                this.store.select(fromRoot.getScheduleDate),
                this.store.select(fromRoot.getScheduleCountyCode)
            );
        })
        .switchMap(values => {
            const [date, countryCode] = values;
            return this.tvmazeService.getSchedule(date, countryCode);
        })
        .map(res => new ScheduleActions.LoadSuccess(res)) as Observable<Action>;
}
