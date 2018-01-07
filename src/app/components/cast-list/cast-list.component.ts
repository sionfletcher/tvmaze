import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromRoot from '../../reducers';
import { CastMember } from '../../models';

@Component({
    selector: 'app-cast-list',
    templateUrl: './cast-list.component.html',
    styleUrls: ['./cast-list.component.scss']
})
export class CastListComponent implements OnInit {

    castMembers$: Observable<CastMember[]>;

    constructor(
        private store: Store<fromRoot.State>
    ) { }

    ngOnInit() {
        this.castMembers$ = this.store.select(fromRoot.getSelectedShowCastMembers);
    }

}
