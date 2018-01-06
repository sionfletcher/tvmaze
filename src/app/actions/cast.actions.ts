import { Action } from '@ngrx/store';

import { CastMember } from '../models';

export const LOAD           = '[Cast] Load';
export const LOAD_SUCCESS   = '[Cast] Load Success';

export class Load implements Action {
    readonly type = LOAD;
    constructor(public payload: string) { }
}

export class LoadSuccess implements Action {
    readonly type = LOAD_SUCCESS;
    constructor(public payload: { id: string, castMembers: CastMember[] }) { }
}

export type All = Load | LoadSuccess;
