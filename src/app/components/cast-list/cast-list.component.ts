import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { CastMember } from '../../models';

@Component({
    selector: 'app-cast-list',
    templateUrl: './cast-list.component.html',
    styleUrls: ['./cast-list.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CastListComponent implements OnInit {

    @Input() castMembers: CastMember[];

    constructor() { }

    ngOnInit() {
    }

}
