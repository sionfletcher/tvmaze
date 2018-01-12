import { Input, Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import * as _ from 'lodash';
import * as fromRoot from '../../reducers';
import { Show } from '../../models';

@Component({
    selector: 'app-show-info',
    templateUrl: './show-info.component.html',
    styleUrls: ['./show-info.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShowInfoComponent implements OnInit {

    show$: Observable<Show>;
    details$: Observable<{ label: string, value: string }[]>;

    constructor(
        private store: Store<fromRoot.State>
    ) { }

    ngOnInit() {
        this.show$ = this.store.select(fromRoot.getSelectedShow);
        this.details$ = this.show$
            .map(show => {

                let details = [{
                    label: 'Streamed on',
                    value: show.network.name
                }, {
                    label: 'Schedule',
                    value: show.schedule.days.join(', ')
                }, {
                    label: 'Status',
                    value: show.status
                }, {
                    label: 'Genres',
                    value: show.genres.join(', ')
                }];

                // Remove empties
                details = _.filter(details, detail => {
                    return !!detail.value.length;
                });

                return details;

            });
    }

}
