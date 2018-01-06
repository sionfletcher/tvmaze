import { ActionReducerMap, createSelector, createFeatureSelector } from '@ngrx/store';

import * as fromSchedule from './schedule.reducer';

export interface State {
    schedule: fromSchedule.State;
}

export const reducers: ActionReducerMap<State> = {
    schedule: fromSchedule.reducer
};

export const getScheduleState = createFeatureSelector<fromSchedule.State>('schedule');

export const getScheduleDate = createSelector(
    getScheduleState,
    state => {
        console.log(state);
        return state.date;
    }
);

export const getScheduleCountyCode = createSelector(
    getScheduleState,
    fromSchedule.getCountryCode
);
