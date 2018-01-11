import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/take';
import 'rxjs/add/observable/if';
import 'rxjs/add/observable/of';

import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Actions, toPayload } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

import * as ShowActions from '../actions/show.actions';
import * as fromRoot from '../reducers';
import { TvMazeService } from '../services/tv-maze.service';

@Injectable()
export class ShowExistsGuard implements CanActivate {

    constructor(
        private store: Store<fromRoot.State>,
        private actions$: Actions,
        private router: Router,
        private tvMazeService: TvMazeService
    ) { }

    // The show store is populated by the schedule API request
    // fired by the HomePageComponent. If we're navigating from
    // the home page, we can load the show immediately.

    // If the site entry point is at a show page, we need to load
    // the show data here
    canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
        const id = route.params['id'];

        return this.store.select(fromRoot.getShowById(id))
            .switchMap(show => {
                return Observable.if(

                    () => !!show,

                    // If show exists in store, return true
                    Observable.of(true),

                    // Else fetch
                    Observable.of(id)
                        .switchMap(() => {

                            return this.tvMazeService.getShow(id)

                                // On success this will fire the store selector above again
                                // and we'll hit a success on the "if" observable
                                // and the route will activate
                                .do(res => this.store.dispatch(new ShowActions.LoadSuccess(res)))
                                .map(() => true)

                                // On fail, ideally show a 404 - just redirect for now
                                .catch((err) => {
                                    this.router.navigate(['/']);
                                    return Observable.of(false);
                                });
                        })
                );
            });
    }

}
