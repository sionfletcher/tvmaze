import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/forkJoin';

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import * as moment from 'moment';
import * as _ from 'lodash';

import { Episode, CastMember, Show } from '../models';

@Injectable()
export class TvMazeService {

    private API_URL = 'http://api.tvmaze.com';

    constructor(
        private http: Http
    ) { }

    getShowsForWeek(date: Date, countryCode: string = 'GB'): Observable<Show[]> { // TODO - schedule model

        const dates = [];
        const weekStart = moment(date).startOf('isoWeek');

        for (let i = 0; i < 7; i++) {
            dates.push(weekStart.format('YYYY-MM-DD'));
            weekStart.add(1, 'days');
        }

        return Observable.of(dates)
            .switchMap(theDates => {
                const queries = theDates.map(d =>
                    this.http.get(`${this.API_URL}/schedule`, {
                        params: {
                            date: d,
                            country: countryCode
                        }
                    })
                    .map(res => res.json() as Episode[])
                );
                return Observable.forkJoin(queries);
            })
            .map(episodes => _.flattenDeep(episodes))
            .map(episodes => episodes.map(episode => episode.show))
            .map(shows => _.uniqBy(shows, 'id')) as Observable<Show[]>;
    }

    getShow(id: string): Observable<Show> {
        return this.http.get(`${this.API_URL}/shows/${id}`)
            .map(res => res.json() as Show);
    }


    getCast(id: string): Observable<CastMember[]> {
        return this.http.get(`${this.API_URL}/shows/${id}/cast`)
            .map(res => res.json() as CastMember[]);
    }

}
