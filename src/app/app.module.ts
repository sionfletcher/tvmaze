import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { RouterModule } from '@angular/router';

// Store
import { reducers } from './reducers';
import { ScheduleEffects } from './effects/schedule.effects';

// Services
import { TvmazeService } from './services/tvmaze.service';

import { routes } from './routes';

// Components
import { AppComponent } from './containers/app/app.component';
import { ShowPageComponent } from './containers/show-page/show-page.component';
import { EpisodeListComponent } from './components/episode-list/episode-list.component';
import { EpisodeListItemComponent } from './components/episode-list-item/episode-list-item.component';
import { HomePageComponent } from './containers/home-page/home-page.component';

@NgModule({
    declarations: [
        AppComponent,
        ShowPageComponent,
        EpisodeListComponent,
        EpisodeListItemComponent,
        HomePageComponent
    ],
    imports: [
        BrowserModule,
        HttpModule,

        RouterModule.forRoot(routes),

        StoreModule.forRoot(reducers),
        EffectsModule.forRoot([
            ScheduleEffects
        ]),

        // TODO - env conditional
        StoreDevtoolsModule.instrument({
            maxAge: 25 // Retains last 25 states
        })
    ],
    providers: [
        TvmazeService
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }
