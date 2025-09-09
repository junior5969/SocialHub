import { Component } from '@angular/core';
import { Auth } from '../../auth/auth';
import { RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  standalone:true,
  imports: [RouterLink, AsyncPipe, MatIcon],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class Header{

 tokenUrl = 'https://gorest.co.in/consumer/login';

  constructor(private auth: Auth) {}

  // getter che richiama direttamente il servizio
  get isLoggedIn() {
    return this.auth.isAuthenticated$();
  }


  onCreateToken() {
    window.open(this.tokenUrl, '_blank');
  }

  logout() {
    this.auth.logout();
  }
}