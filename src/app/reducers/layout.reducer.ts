// TODO - move GB / Date filters here...
import * as LayoutActions from '../actions/layout.actions';
import * as fromRoot from './';

import * as moment from 'moment';

export enum SortType {
    POPULARITY,
    RATING
}

export interface State {
    date: Date;
    locale: string;
    selectedShowId: string;
    sort: SortType;
}

const initialState: State = {
    date: moment(new Date()).startOf('isoWeek').toDate(),
    locale: 'GB',
    selectedShowId: null,
    sort: SortType.RATING
};

export function reducer(
    state: State = initialState,
    action: LayoutActions.All
): State {
    switch (action.type) {

        case LayoutActions.SET_DATE:
            return { ...state, date: action.payload };

        case LayoutActions.SET_LOCALE:
            return { ...state, locale: action.payload };

        case LayoutActions.SET_SELECTED_SHOW_ID:
            return { ...state, selectedShowId: action.payload };

        case LayoutActions.NEXT_SORT_TYPE: {

            let newSort;

            switch (state.sort) {
                case SortType.POPULARITY:
                    newSort = SortType.RATING;
                    break;
                case SortType.RATING:
                    newSort = SortType.POPULARITY;
                    break;
            }
            return {
                ...state,
                sort: newSort
            };
        }

        default:
            return state;
    }
}

export const getSort = (state: State) => state.sort;

export const getDate = (state: State) => state.date;

export const getLocale = (state: State) => state.locale;

export const getSelectedShowId = (state: State) => state.selectedShowId;
