import { Action } from '@ngrx/store';

export const LOAD           = '[SCHEDULE] Load';
export const LOAD_SUCCESS   = '[SCHEDULE] Load Success';

export class Load implements Action {
    readonly type = LOAD;
}

export class LoadSuccess implements Action {
    readonly type = LOAD_SUCCESS;
    constructor(public payload: any[]) { } // TODO - episodes model
}

export type All = Load | LoadSuccess;
