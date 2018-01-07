import * as ScheduleActions from '../actions/schedule.actions';

export interface State {
    showIds: number[];
    isLoading: boolean;
    isLoaded: boolean;
    hasError: boolean;
    error?: Error;
}

const initialState: State = {
    showIds: [],
    isLoading: false,
    isLoaded: false,
    hasError: false
};

export function reducer(
    state: State = initialState,
    action: ScheduleActions.All
): State {
    switch (action.type) {
        case ScheduleActions.LOAD: {
            return {
                ...state,
                isLoading: true
            };
        }

        case ScheduleActions.LOAD_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                isLoaded: true,
                showIds: action.payload.map(show => show.id)
            };
        }

        // TODO - LOAD_ERROR
        default: {
            return state;
        }
    }
}

export const getShowIds = (state: State) => state.showIds;
