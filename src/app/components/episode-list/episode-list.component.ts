import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

import { Episode } from '../../models';

@Component({
    selector: 'app-episode-list',
    templateUrl: './episode-list.component.html',
    styleUrls: ['./episode-list.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EpisodeListComponent implements OnInit {

    @Input() episodes: Episode[];

    constructor() { }

    ngOnInit() {
    }

}
