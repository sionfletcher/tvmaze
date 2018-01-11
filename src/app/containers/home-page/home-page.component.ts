import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';


import { Episode } from '../../models';
import * as fromRoot from '../../reducers';
import * as ScheduleActions from '../../actions/schedule.actions';

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

    shows$: Observable<any[]>;

    constructor(
        private store: Store<fromRoot.State>
    ) { }

    ngOnInit() {
        this.store.dispatch(new ScheduleActions.Load());
        this.shows$ = this.store.select(fromRoot.getSortedShows);
    }

}
