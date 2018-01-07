import * as ScheduleActions from '../actions/schedule.actions';
import * as ShowActions from '../actions/show.actions';

import * as _ from 'lodash';

import { Show } from '../models';

export interface State {
    [id: string]: Show;
}

export function reducer(
    state: State = {},
    action: ScheduleActions.All | ShowActions.All
): State {
    switch (action.type) {

        case ScheduleActions.LOAD_SUCCESS: {

            // TODO - filter shows already in list
            const shows = _.keyBy(action.payload, 'id');
            return { ...state, ...shows };
        }

        case ShowActions.LOAD_SUCCESS: {
            return {
                ...state,
                [action.payload.id]: action.payload
            };
        }

        // case

        default:
            return state;
    }
}
