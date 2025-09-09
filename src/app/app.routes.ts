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
    {path: 'homepage', component:Homepage}, 
    {path: 'login', component:Login},
    {path: 'users', component: Users, canActivate: [authGuard]},
    {path: 'users/:id', component: UserDetail},
    {path: 'posts', component: Posts},
    {path: '404', component: Notfound},  
    {path: '**', redirectTo: '/404'},  //per qualsiasi altra rotta non definita, reindirizza a not found 404
];
