import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import * as moment from 'moment';

@Injectable()
export class TvmazeService {

    private API_URL = 'http://api.tvmaze.com';

    constructor(
        private http: Http
    ) { }

    schedule(date: Date = new Date(), countryCode: string = 'GB'): Observable<any[]> { // TODO - schedule model

        const dateString = moment(date).format('YYYY-MM-DD');

        return this.http.get(`${this.API_URL}/schedule`, {
            params: {
                date: dateString,
                country: countryCode
            }
        })
        .map(res => res.json());
    }

    show(id: string): Observable<any> { // TODO - show model
        return this.http.get(`${this.API_URL}/shows/${id}`)
            .map(res => res.json());
    }

}
