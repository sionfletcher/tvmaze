import { Injectable } from '@angular/core';
import { Actions, toPayload } from '@ngrx/effects';
import { Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { TvMazeService } from '../services/tv-maze.service';

import * as EpisodeActions from '../actions/episode.actions';

@Injectable()
export class EpisodeEffects {

    constructor(
        private actions$: Actions,
        private tvMazeService: TvMazeService
    ) { }

    @Effect()
    load$: Observable<Action> = this.actions$
        .ofType(EpisodeActions.LOAD)
        .map(toPayload)
        .mergeMap(id => this.tvMazeService.getEpisodes(id)
            .map(episodes => {
                return {
                    type: EpisodeActions.LOAD_SUCCESS,
                    payload: { id, episodes }
                };
            })
        ) as Observable<Action>;
}
