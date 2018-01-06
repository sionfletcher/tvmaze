import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Input } from '@angular/core';

import { Episode } from '../../models';

@Component({
    selector: 'app-episode-list-item',
    templateUrl: './episode-list-item.component.html',
    styleUrls: ['./episode-list-item.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EpisodeListItemComponent {

    @Input() episode: Episode;

}
