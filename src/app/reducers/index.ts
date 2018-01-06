import { ActionReducerMap, createSelector, createFeatureSelector } from '@ngrx/store';

import * as fromSchedule from './schedule.reducer';
import * as fromShows from './shows.reducer';
import * as fromCasts from './casts.reducer';

export interface State {
    schedule: fromSchedule.State;
    shows: fromShows.State;
    casts: fromCasts.State;
}

export const reducers: ActionReducerMap<State> = {
    schedule: fromSchedule.reducer,
    shows: fromShows.reducer,
    casts: fromCasts.reducer
};

export const getScheduleState = createFeatureSelector<fromSchedule.State>('schedule');
export const getShowsState = createFeatureSelector<fromShows.State>('shows');
export const getCastsState = createFeatureSelector<fromCasts.State>('casts');

export const getScheduleDate = createSelector(
    getScheduleState,
    fromSchedule.getDate
);

export const getScheduleCountyCode = createSelector(
    getScheduleState,
    fromSchedule.getCountryCode
);

export const getShowIds = createSelector(
    getScheduleState,
    fromSchedule.getShowIds
);

export const getShows = createSelector(
    getShowIds,
    getShowsState,
    (ids, shows) => ids.map(id => shows[id])
);
