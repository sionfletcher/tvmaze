import * as ScheduleActions from '../actions/schedule.actions';

import * as _ from 'lodash';

import { Show } from '../models';

export interface State {
    [id: string]: Show;
}

export function reducer(
    state: State = {},
    action: ScheduleActions.All
): State {
    switch (action.type) {

        case ScheduleActions.LOAD_SUCCESS: {

            // TODO - filter shows already in list
            const shows = _.keyBy(action.payload, 'id');
            return { ...state, ...shows };
        }

        default:
            return state;
    }
}
