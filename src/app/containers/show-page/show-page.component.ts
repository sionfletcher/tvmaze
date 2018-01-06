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
import { Show } from '../../models/index';

@Component({
    selector: 'app-show-page',
    templateUrl: './show-page.component.html',
    styleUrls: ['./show-page.component.css']
})
export class ShowPageComponent implements OnInit, OnDestroy {

    id$: Observable<string>;
    show$: Observable<Show>;
    sub: Subscription;

    constructor(
        private route: ActivatedRoute,
        private store: Store<fromRoot.State>
    ) { }

    ngOnInit() {

        this.id$ = this.route.params
            .map(params => params.id)
            .filter(id => !!id)
            .distinctUntilChanged();

        this.sub = this.id$
            .do(id => this.store.dispatch(new CastActions.Load(id)))
            .subscribe();

        // this.show$ = this.id$
        //     .switchMap(id => this.store.select(fromRoot.getSelectedShow));
        // this.castMembers = this.id$
        //     .switchMap(id => this.store.select(fromRoot.getCastForShowId(id)))
        // this.id$.subscribe(id => console.log(id));
        // this.id$.subscribe(id => console.log(id));
        // this.route.params.subscribe(p => console.log(p));
    }

    ngOnDestroy() {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }



}
