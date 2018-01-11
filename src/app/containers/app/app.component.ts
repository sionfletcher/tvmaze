import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/defaultIfEmpty';

import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { MediaChange, ObservableMedia } from '@angular/flex-layout';

import * as fromRoot from '../../reducers';
import { Show, Episode } from '../../models/index';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    entries$: Observable<{ episode: Episode, show: Show }[]>;
    watchTime$: Observable<number>;
    sidenavMode$: Observable<string>;
    mode = 'side';

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
                )
                    .defaultIfEmpty([]);
            });

        this.watchTime$ = this.entries$
            .map(entries => entries.reduce((acc, entry) => entry.episode.runtime + acc, 0));

        this.media.asObservable()
            .do((change: MediaChange) => {
                if (change.mqAlias === 'sm' || change.mqAlias === 'xs' || change.mqAlias === 'md') {
                    this.mode = 'over';
                } else {
                    this.mode = 'side';
                }
            })
            .subscribe();
    }

}
