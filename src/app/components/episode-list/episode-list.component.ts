import 'rxjs/add/operator/map';

import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Episode } from '../../models';

import { Observable } from 'rxjs/Observable';

import * as fromRoot from '../../reducers';
import * as _ from 'lodash';


@Component({
    selector: 'app-episode-list',
    templateUrl: './episode-list.component.html',
    styleUrls: ['./episode-list.component.scss']
})
export class EpisodeListComponent implements OnInit {

    episodes$: Observable<Episode[]>;
    index: number = 0; // TODO -pagination

    constructor(
        private store: Store<fromRoot.State>
    ) { }

    ngOnInit() {
        this.episodes$ = this.store.select(fromRoot.getSortedEpisodesForSelectedShow)
            .map(episodes => _.chunk(episodes, 20));
    }


    // TODO - pagination

}
