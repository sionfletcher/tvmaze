import 'rxjs/add/operator/map';

import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromRoot from '../../reducers';
import * as fromLayout from '../../reducers/layout.reducer';
import * as LayoutActions from '../../actions/layout.actions';

@Component({
    selector: 'app-sort-input',
    templateUrl: './sort-input.component.html',
    styleUrls: ['./sort-input.component.scss']
})
export class SortInputComponent implements OnInit {

    sortString$: Observable<string>;

    constructor(
        private store: Store<fromRoot.State>
    ) { }

    ngOnInit() {
        this.sortString$ = this.store.select(fromRoot.getSort)
            .map(sort => {
                switch (sort) {
                    case fromLayout.SortType.POPULARITY:
                        return 'popularity';
                    case fromLayout.SortType.RATING:
                        return 'rating';
                }
            })
    }

    nextSort() {
        this.store.dispatch(new LayoutActions.NextSort);
    }

}
