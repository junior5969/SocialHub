import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  // Stato reattivo
  private isLoggedIn$ = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private router: Router) {}

  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
    this.isLoggedIn$.next(true); // notifica login
  }

  clearToken() {
    localStorage.removeItem('token');
    this.isLoggedIn$.next(false); // notifica logout
  }

  // check sincrono 
  isAuthenticated(): boolean {
    return this.hasToken();
  }

  // check reattivo 
  isAuthenticated$(): Observable<boolean> {
    return this.isLoggedIn$.asObservable();
  }

  logout() {
    this.clearToken();
    this.router.navigate(['/login']);
  }
}