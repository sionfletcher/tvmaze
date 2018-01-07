import { ActionReducerMap, createSelector, createFeatureSelector } from '@ngrx/store';

import * as fromSchedule from './schedule.reducer';
import * as fromShows from './shows.reducer';
import * as fromCasts from './casts.reducer';
import * as fromLayout from './layout.reducer';

export interface State {
    layout: fromLayout.State;
    schedule: fromSchedule.State;
    shows: fromShows.State;
    casts: fromCasts.State;
}

export const reducers: ActionReducerMap<State> = {
    layout: fromLayout.reducer,
    schedule: fromSchedule.reducer,
    shows: fromShows.reducer,
    casts: fromCasts.reducer
};

export const getLayoutState = createFeatureSelector<fromLayout.State>('layout');
export const getScheduleState = createFeatureSelector<fromSchedule.State>('schedule');
export const getShowsState = createFeatureSelector<fromShows.State>('shows');
export const getCastsState = createFeatureSelector<fromCasts.State>('casts');

export const getDate = createSelector(
    getLayoutState,
    fromLayout.getDate
);

export const getLocale = createSelector(
    getLayoutState,
    fromLayout.getLocale
);

export const getSelectedShowId = createSelector(
    getLayoutState,
    fromLayout.getSelectedShowId
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

export const getSelectedShow = createSelector(
    getSelectedShowId,
    getShowsState,
    (id, shows) => shows[id]
);

export const getShowById = (id: string) => {
    return createSelector(
        getShowsState,
        shows => shows[id] || null
    );
};

export const getSelectedShowCastMembers = createSelector(
    getSelectedShowId,
    getCastsState,
    (id, casts) => casts[id]
);
