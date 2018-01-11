import { Episode } from '../models';
import * as EpisodesActions from '../actions/episode.actions';

export interface State {
    [id: string]: Episode[];
}

export function reducer(state: State = {}, action: EpisodesActions.All): State {
    switch (action.type) {

        case EpisodesActions.LOAD_SUCCESS: {
            return {
                ...state,
                [action.payload.id]: action.payload.episodes
            };
        }

        default:
            return state;
    }
}
