import { Action } from '@ngrx/store';
import { Episode } from '../models/index';

export const LOAD           = '[Episodes] Load';
export const LOAD_SUCCESS   = '[Episodes] Load Success';

export class Load implements Action {
    readonly type = LOAD;
    constructor(public payload: string) { }
}

export class LoadSuccess implements Action {
    readonly type = LOAD_SUCCESS;
    constructor(public payload: { id: string, episodes: Episode[] }) { }
}

export type All = Load | LoadSuccess;
