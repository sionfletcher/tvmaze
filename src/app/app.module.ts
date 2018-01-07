import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { RouterModule } from '@angular/router';

// Material + Flex
import {
    MatIconModule
} from '@angular/material';

import { FlexLayoutModule } from '@angular/flex-layout';

// Store
import { reducers } from './reducers';
import { ScheduleEffects } from './effects/schedule.effects';
import { CastEffects } from './effects/cast.effects';
import { ShowEffects } from './effects/show.effects';

// Services
import { TvMazeService } from './services/tv-maze.service';
import { ShowExistsGuard } from './guards/show-exists.guard';

import { routes } from './routes';

// Components
import { AppComponent } from './containers/app/app.component';
import { ShowPageComponent } from './containers/show-page/show-page.component';
import { HomePageComponent } from './containers/home-page/home-page.component';
import { ShowListComponent } from './components/show-list/show-list.component';
import { ShowListItemComponent } from './components/show-list-item/show-list-item.component';
import { CastListComponent } from './components/cast-list/cast-list.component';
import { DateInputComponent } from './components/date-input/date-input.component';
import { ShowInfoComponent } from './components/show-info/show-info.component';
import { ShowHeaderComponent } from './components/show-header/show-header.component';
import { RatingComponent } from './components/rating/rating.component';
import { RatingEnumeratedComponent } from './components/rating-enumerated/rating-enumerated.component';

@NgModule({
    declarations: [
        AppComponent,
        ShowPageComponent,
        HomePageComponent,
        ShowListComponent,
        ShowListItemComponent,
        CastListComponent,
        DateInputComponent,
        ShowInfoComponent,
        ShowHeaderComponent,
        RatingComponent,
        RatingEnumeratedComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpModule,

        FlexLayoutModule,
        MatIconModule,

        RouterModule.forRoot(routes),

        StoreModule.forRoot(reducers),
        EffectsModule.forRoot([
            ScheduleEffects,
            CastEffects,
            ShowEffects
        ]),

        // TODO - env conditional
        StoreDevtoolsModule.instrument({
            maxAge: 20
        })
    ],
    providers: [
        TvMazeService,
        ShowExistsGuard
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }
