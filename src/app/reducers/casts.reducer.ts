import * as CastActions from '../actions/cast.actions';

import { CastMember } from '../models';

export interface State {
    [id: string]: CastMember[];
}

export function reducer(
    state: State = {},
    action: CastActions.All
): State {
    switch (action.type) {

        case CastActions.LOAD_SUCCESS: {
            return {
                ...state,
                [action.payload.id]: action.payload.castMembers
            };
        }

        default:
            return state;
    }
}
