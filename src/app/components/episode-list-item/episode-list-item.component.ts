import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { Episode } from '../../models';
import * as fromRoot from '../../reducers';
import * as ListActions from '../../actions/list.actions';

@Component({
    selector: 'app-episode-list-item',
    templateUrl: './episode-list-item.component.html',
    styleUrls: ['./episode-list-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EpisodeListItemComponent implements OnInit {

    @Input() episode: Episode;
    inList$: Observable<boolean>;

    constructor(
        private store: Store<fromRoot.State>
    ) { }

    ngOnInit() {
        this.inList$ = this.store.select(fromRoot.getListState)
            .map(episodes => episodes.indexOf(this.episode.id) !== -1);
    }

    toggle() {
        this.inList$
            .take(1)
            .do((inList) => {
                if (!inList) {
                    return this.store.dispatch(new ListActions.AddEpisode(this.episode.id));
                } else {
                    return this.store.dispatch(new ListActions.RemoveEpisode(this.episode.id));
                }
            })
            .subscribe();
    }

}
