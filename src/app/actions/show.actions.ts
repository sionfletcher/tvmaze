import { Action } from '@ngrx/store';
import { Show } from '../models';

export const LOAD = '[Show] Load';
export const LOAD_SUCCESS = '[Show] Load Success';
export const LOAD_ERROR = '[Show] Load Error';

export class Load implements Action {
    readonly type = LOAD;
    constructor(public payload: string) { }
}

export class LoadSuccess implements Action {
    readonly type = LOAD_SUCCESS;
    constructor(public payload: Show) { }
}

export class LoadError implements Action {
    readonly type = LOAD_ERROR;
    constructor(public payload: string) { }
}

export type All = Load | LoadSuccess | LoadError;
