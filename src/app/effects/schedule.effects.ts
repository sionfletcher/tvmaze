import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/switchMap';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect, toPayload } from '@ngrx/effects';

import { TvMazeService } from '../services/tv-maze.service';

import * as fromRoot from '../reducers/';
import * as ScheduleActions from '../actions/schedule.actions';

@Injectable()
export class ScheduleEffects {

    constructor(
        private actions$: Actions,
        private store: Store<fromRoot.State>,
        private tvmazeService: TvMazeService
    ) { }

    @Effect()
    load$: Observable<Action> = this.actions$
        .ofType(ScheduleActions.LOAD)
        .switchMap(() => {
            return Observable.combineLatest(
                this.store.select(fromRoot.getDate),
                this.store.select(fromRoot.getLocale)
            );
        })
        .switchMap(values => {
            const [date, countryCode] = values;
            return this.tvmazeService.getShowsForWeek(date, countryCode);
        })
        .map(res => new ScheduleActions.LoadSuccess(res)) as Observable<Action>;
}
