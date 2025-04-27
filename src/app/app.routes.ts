import { Routes } from '@angular/router';
import {AllComponent} from './all/all.component';
import { MoviesComponent } from './movies/movies.component';
import { PeopleComponent } from './people/people.component';
import { TvComponent } from './tv/tv.component';
import { NotFoundComponent } from './not-found/not-found.component';


export const routes: Routes = [
    {path: '', redirectTo: 'all', pathMatch: 'full' },
    {path: 'all', component: AllComponent, title: "All" },
    {path: 'movies', component: MoviesComponent, title: "Movies" },
    {path: 'people', component: PeopleComponent, title: "People" },
    {path: 'tv', component: TvComponent, title:"TV" },

    {path: '**', component: NotFoundComponent, title: "Not Found" }
];
