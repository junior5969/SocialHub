import { Routes } from '@angular/router';
import { authGuard } from './auth/auth-guard';

import { HomepageComponent } from './components/homepage/homepage.component';
import { LoginComponent } from './components/login/login.component';
import { UsersComponent } from './components/users/users.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { PostsComponent } from './components/posts/posts.component';

export const routes: Routes = [
    {path: '', pathMatch: 'full', redirectTo: '/homepage'},
    {path: 'homepage', loadComponent: () => import('./components/homepage/homepage.component').then(c => c.HomepageComponent)},
    {path: 'login', loadComponent: () => import('./components/login/login.component').then(c => c.LoginComponent)},
    {path: 'users', loadComponent: () => import('./components/users/users.component').then(c => c.UsersComponent), canActivate: [authGuard]},
    {path: 'users/:id', loadComponent: () => import('./components/user-detail/user-detail.component').then(c => c.UserDetailComponent)},
    {path: 'posts', loadComponent: () => import('./components/posts/posts.component').then(c => c.PostsComponent)},
    {path: '404', loadComponent: () => import('./components/notfound/notfound.component').then(c => c.NotfoundComponent)}, 
    {path: '**', redirectTo: '/404'},  //per qualsiasi altra rotta non definita, reindirizza a not found 404
];
