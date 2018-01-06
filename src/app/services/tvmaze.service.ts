import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import * as moment from 'moment';
import { Episode, CastMember, Show } from '../models';

@Injectable()
export class TvmazeService {

    private API_URL = 'http://api.tvmaze.com';

    constructor(
        private http: Http
    ) { }

    getSchedule(date: Date = new Date(), countryCode: string = 'GB'): Observable<Show[]> { // TODO - schedule model

        const dateString = moment(date).format('YYYY-MM-DD');

        return this.http.get(`${this.API_URL}/schedule`, {
            params: {
                date: dateString,
                country: countryCode
            }
        })
        .map(res => res.json() as Episode[])
        .map(episodes => episodes.map(episode => episode.show) as Show[]);
    }

    getShow(id: string): Observable<Show> { // TODO - show model
        return this.http.get(`${this.API_URL}/shows/${id}`)
            .map(res => res.json() as Show);
    }


    getCast(id: string): Observable<CastMember[]> {
        return this.http.get(`${this.API_URL}/shows/${id}/cast`)
            .map(res => res.json() as CastMember[]);
    }

}
