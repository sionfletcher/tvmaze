import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromRoot from '../../reducers';
import { Show } from '../../models';

@Component({
    selector: 'app-show-header',
    templateUrl: './show-header.component.html',
    styleUrls: ['./show-header.component.scss']
})
export class ShowHeaderComponent implements OnInit {

    show$: Observable<Show>;

    constructor(
        private store: Store<fromRoot.State>
    ) { }

    ngOnInit() {
        this.show$ = this.store.select(fromRoot.getSelectedShow);
    }

}
