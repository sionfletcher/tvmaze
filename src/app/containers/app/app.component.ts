import 'rxjs/add/observable/combineLatest';

import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

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

    constructor(
        private store: Store<fromRoot.State>
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
                    );
            });

        this.watchTime$ = this.entries$
            .map(entries => entries.reduce((acc, entry) => entry.episode.runtime + acc, 0));
    }

}
