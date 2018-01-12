import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/defaultIfEmpty';

import { Component, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { MediaChange, ObservableMedia } from '@angular/flex-layout';
import { MatSidenav } from '@angular/material';

import * as fromRoot from '../../reducers';
import * as ListActions from '../../actions/list.actions';
import { Show, Episode } from '../../models';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    @ViewChild('sidenav') public sidenav: MatSidenav;
    entries$: Observable<{ episode: Episode, show: Show }[]>;
    watchTime$: Observable<number>;
    isSmall$: Observable<boolean>;
    mode = 'side';
    openOnInit: boolean;

    constructor(
        private store: Store<fromRoot.State>,
        private media: ObservableMedia
    ) { }

    ngOnInit() {
        this.entries$ = this.store.select(fromRoot.getListEpisodes)
            .switchMap((episodes: Episode[]) => {
                return Observable.combineLatest(
                    episodes.map(episode =>
                        this.store.select(fromRoot.getShowForEpisode(episode.id))
                            .map(show => {
                                return { episode, show };
                            })
                    )
                ).defaultIfEmpty([]);
            });

        this.watchTime$ = this.store.select(fromRoot.getListDuration);

        this.isSmall$ = this.media.asObservable()
            .map((change: MediaChange) =>
                change.mqAlias === 'sm'
                || change.mqAlias === 'xs'
                || change.mqAlias === 'md'
            );

        this.isSmall$.do((isSmall: boolean) => {
            if (isSmall) {
                this.mode = 'over';
            } else {
                this.mode = 'side';
                this.sidenav.open();
            }
        })
            .subscribe();

        this.isSmall$
            .take(1)
            .do((isSmall) => this.openOnInit = !isSmall)
            .subscribe();
    }

    removeEpisode(id: string) {
        this.store.dispatch(new ListActions.RemoveEpisode(id));
    }

}
