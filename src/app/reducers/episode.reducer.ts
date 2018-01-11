import { Episode } from '../models';
import * as EpisodesActions from '../actions/episode.actions';
import * as _ from 'lodash';

export interface State {
    all: {
        [id: string]: Episode;
    };
    byShowId: {
        [id: string]: string[];
    };
}

const initialState: State = {
    all: {},
    byShowId: {}
};

export function reducer(state: State = initialState, action: EpisodesActions.All): State {
    switch (action.type) {

        case EpisodesActions.LOAD_SUCCESS: {
            return {
                ...state,
                all: {
                    ...state.all,
                    ..._.keyBy(action.payload.episodes, 'id')
                },
                byShowId: {
                    ...state.byShowId,
                    [action.payload.id]: action.payload.episodes.map(e => e.id)
                }
            };
        }

        default:
            return state;
    }
}
