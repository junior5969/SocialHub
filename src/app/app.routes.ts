import { Routes } from '@angular/router';
import { authGuard } from './auth/auth-guard';

import { Homepage } from './components/homepage/homepage';
import { Login } from './components/login/login';
import { Users } from './components/users/users';
import { UserDetail } from './components/user-detail/user-detail';
import { Notfound } from './components/notfound/notfound';
import { Posts } from './components/posts/posts';

export const routes: Routes = [
    {path: '', pathMatch: 'full', redirectTo: '/homepage'},
    {path: 'homepage', loadComponent: () => import('./components/homepage/homepage').then(c => c.Homepage)},
    {path: 'login', loadComponent: () => import('./components/login/login').then(c => c.Login)},
    {path: 'users', loadComponent: () => import('./components/users/users').then(c => c.Users), canActivate: [authGuard]},
    {path: 'users/:id', loadComponent: () => import('./components/user-detail/user-detail').then(c => c.UserDetail)},
    {path: 'posts', loadComponent: () => import('./components/posts/posts').then(c => c.Posts)},
    {path: '404', loadComponent: () => import('./components/notfound/notfound').then(c => c.Notfound)}, 
    {path: '**', redirectTo: '/404'},  //per qualsiasi altra rotta non definita, reindirizza a not found 404
];
