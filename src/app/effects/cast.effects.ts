import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store/src/models';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

import * as CastActions from '../actions/cast.actions';
import { TvmazeService } from '../services/tvmaze.service';

@Injectable()
export class CastEffects {

    constructor(
        private actions$: Actions,
        private tvmazeService: TvmazeService
    ) { }

    @Effect()
    load$: Observable<Action> = this.actions$
        .ofType(CastActions.LOAD)
        .map(toPayload)
        .mergeMap(id => this.tvmazeService.getCast(id)
            .map(castMembers => {
                return {
                    type: CastActions.LOAD_SUCCESS,
                    payload: {
                        id, castMembers
                    }
                };
            })
        ) as Observable<Action>;

}
