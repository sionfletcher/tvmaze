import 'rxjs/add/operator/catch';

import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';

import * as ShowActions from '../actions/show.actions';
import { TvMazeService } from '../services/tv-maze.service';
import { toPayload } from '@ngrx/effects/src/util';
import { Router } from '@angular/router';

@Injectable()
export class ShowEffects {

    constructor(
        private actions$: Actions,
        private tvMazeService: TvMazeService
    ) { }

    @Effect()
    load$: Observable<Action> = this.actions$
        .ofType(ShowActions.LOAD)
        .map(toPayload)
        .mergeMap(id => this.tvMazeService.getShow(id)
            .map(show => {
                return {
                    type: ShowActions.LOAD_SUCCESS,
                    payload: show
                };
            })
            .catch((err) => {
                return Observable.of({
                    type: ShowActions.LOAD_ERROR,
                    payload: id
                });
            })
    ) as Observable<Action>;
}
