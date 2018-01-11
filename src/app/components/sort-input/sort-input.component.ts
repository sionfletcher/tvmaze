import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromRoot from '../../reducers';
import * as LayoutActions from '../../actions/layout.actions';

@Component({
    selector: 'app-sort-input',
    templateUrl: './sort-input.component.html',
    styleUrls: ['./sort-input.component.scss']
})
export class SortInputComponent implements OnInit {

    constructor(
        private store: Store<fromRoot.State>
    ) { }

    ngOnInit() {
    }

    nextSort() {
        this.store.dispatch(new LayoutActions.NextSort);
    }

}
