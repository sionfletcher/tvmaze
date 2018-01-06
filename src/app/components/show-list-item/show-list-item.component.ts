import { Component, OnInit, Input } from '@angular/core';
import { Show } from '../../models';

@Component({
    selector: 'app-show-list-item',
    templateUrl: './show-list-item.component.html',
    styleUrls: ['./show-list-item.component.css']
})
export class ShowListItemComponent {

    @Input() show: Show;

}
