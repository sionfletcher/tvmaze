import { Action } from '@ngrx/store';

export const ADD_EPISODE        = '[List] Add Episode';
export const ADD_EPISODES       = '[List] Add Episodes';
export const REMOVE_EPISODE     = '[List] Remove Episode';

export class AddEpisode implements Action {
    readonly type = ADD_EPISODE;
    constructor(public payload: string) { }
}

export class AddEpisodes implements Action {
    readonly type = ADD_EPISODES;
    constructor(public payload: string[]) { }
}

export class RemoveEpisode implements Action {
    readonly type = REMOVE_EPISODE;
    constructor(public payload: string) { }
}

export type All = AddEpisode | AddEpisodes | RemoveEpisode;
