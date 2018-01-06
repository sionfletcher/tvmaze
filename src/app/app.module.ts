import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';


import { AppComponent } from './app.component';

import { TvmazeService } from './services/tvmaze.service';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        HttpModule
    ],
    providers: [
        TvmazeService
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }
