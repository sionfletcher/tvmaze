import { Routes } from '@angular/router';

import { ShowPageComponent } from './containers/show-page/show-page.component';
import { HomePageComponent } from './containers/home-page/home-page.component';
import { ShowExistsGuard } from './guards/show-exists.guard';

export const routes: Routes = [
    {
        path: '',
        component: HomePageComponent
    },
    {
        path: 'show/:id',
        component: ShowPageComponent,
        canActivate: [ShowExistsGuard]
    },
    { path: '**', redirectTo: '' }
];
