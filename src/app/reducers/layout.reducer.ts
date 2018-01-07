// TODO - move GB / Date filters here...
import * as LayoutActions from '../actions/layout.actions';
import * as fromRoot from './';

import * as moment from 'moment';

export interface State {
    date: Date;
    locale: string;
    selectedShowId: string;
}

const initialState: State = {
    date: new Date(),
    locale: 'GB',
    selectedShowId: null
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

        default:
            return state;
    }
}

export const getDate = (state: State) => state.date;

export const getLocale = (state: State) => state.locale;

export const getSelectedShowId = (state: State) => state.selectedShowId;
