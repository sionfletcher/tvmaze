import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/distinctUntilChanged';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import * as fromRoot from '../../reducers';
import * as CastActions from '../../actions/cast.actions';
import * as LayoutActions from '../../actions/layout.actions';
import { Show, CastMember } from '../../models';

@Component({
    selector: 'app-show-page',
    templateUrl: './show-page.component.html',
    styleUrls: ['./show-page.component.scss']
})
export class ShowPageComponent implements OnInit, OnDestroy {

    sub: Subscription;

    constructor(
        private route: ActivatedRoute,
        private store: Store<fromRoot.State>
    ) { }

    ngOnInit() {

        const id$ = this.route.params
            .map(params => params.id)
            .distinctUntilChanged();

        this.sub = id$
            .do(id => this.store.dispatch(new LayoutActions.SetSelectedShowId(id)))
            .subscribe();

        // TODO - could add as an effect to setting the selected show
        const castMembersSub = id$
            .do(id => this.store.dispatch(new CastActions.Load(id)))
            .subscribe();

        this.sub.add(castMembersSub);
    }

    ngOnDestroy() {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }



}
