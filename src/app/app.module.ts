import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

import { AppComponent } from './app.component';

import { TvmazeService } from './services/tvmaze.service';

// Store
import { reducers } from './reducers';
import { ScheduleEffects } from './effects/schedule.effects';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        HttpModule,
        StoreModule.forRoot(reducers),
        EffectsModule.forRoot([
            ScheduleEffects
        ]),
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
