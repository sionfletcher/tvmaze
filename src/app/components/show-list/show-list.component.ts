import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Show } from '../../models';

@Component({
    selector: 'app-show-list',
    templateUrl: './show-list.component.html',
    styleUrls: ['./show-list.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShowListComponent implements OnInit {

    @Input() shows: Show[] = [];

    constructor() { }

    ngOnInit() {
    }

}
