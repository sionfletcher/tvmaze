import * as ListActions from '../actions/list.actions';
import * as _ from 'lodash';

export function reducer(state: string[] = [], action: ListActions.All): string[] {
    switch (action.type) {
        case ListActions.ADD_EPISODE: {
            return [
                ...state,
                action.payload
            ];
        }

        case ListActions.ADD_EPISODES: {
            return [
                ...state,
                ...action.payload
            ];
        }

        case ListActions.REMOVE_EPISODE: {
            return _.without(state, action.payload);
        }

        default:
            return state;
    }
}
