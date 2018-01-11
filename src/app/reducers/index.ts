import { ActionReducerMap, createSelector, createFeatureSelector } from '@ngrx/store';

import * as _ from 'lodash';

import * as fromSchedule from './schedule.reducer';
import * as fromShows from './shows.reducer';
import * as fromCasts from './casts.reducer';
import * as fromLayout from './layout.reducer';
import * as fromEpisodes from './episode.reducer';
import * as fromList from './list.reducer';

export interface State {
    layout: fromLayout.State;
    schedule: fromSchedule.State;
    shows: fromShows.State;
    casts: fromCasts.State;
    episodes: fromEpisodes.State;
    list: string[];
}

export const reducers: ActionReducerMap<State> = {
    layout: fromLayout.reducer,
    schedule: fromSchedule.reducer,
    shows: fromShows.reducer,
    casts: fromCasts.reducer,
    episodes: fromEpisodes.reducer,
    list: fromList.reducer
};

export const getLayoutState = createFeatureSelector<fromLayout.State>('layout');
export const getScheduleState = createFeatureSelector<fromSchedule.State>('schedule');
export const getShowsState = createFeatureSelector<fromShows.State>('shows');
export const getCastsState = createFeatureSelector<fromCasts.State>('casts');
export const getEpisodesState = createFeatureSelector<fromEpisodes.State>('episodes');
export const getListState = createFeatureSelector<string[]>('list');

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

export const getSort = createSelector(
    getLayoutState,
    fromLayout.getSort
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

export const getSortedShows = createSelector(
    getShows,
    getSort,
    (shows, sort) => {
        switch (sort) {

            case fromLayout.SortType.POPULARITY: {
                return _.reverse(_.sortBy(shows, show => {
                    return show.weight || 0;
                }));
            }

            case fromLayout.SortType.RATING: {
                return _.reverse(_.sortBy(shows, show => {
                    return show.rating.average || 0;
                }));
            }
        }
    }
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

export const getSortedEpisodesForSelectedShow = createSelector(
    getSelectedShowId,
    getEpisodesState,
    (id, episodes) => _.reverse(_.sortBy(episodes[id], 'airstamp'))
);
