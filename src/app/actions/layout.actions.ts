import { Action } from '@ngrx/store';

export const SET_DATE               = '[Layout] Set Date';
export const SET_LOCALE             = '[Layout] Set Locale';
export const SET_SELECTED_SHOW_ID   = '[Layout] Set Selected Show ID';
export const NEXT_SORT_TYPE         = '[Layout] Next Sort Type';

export class SetDate implements Action {
    readonly type = SET_DATE;
    constructor(public payload: Date) { }
}

export class SetLocale implements Action {
    readonly type = SET_LOCALE;
    constructor(public payload: string) { }
}

export class SetSelectedShowId implements Action {
    readonly type = SET_SELECTED_SHOW_ID;
    constructor(public payload: string) { }
}

export class NextSort implements Action {
    readonly type = NEXT_SORT_TYPE;
}

export type All = SetDate | SetLocale | SetSelectedShowId | NextSort;
