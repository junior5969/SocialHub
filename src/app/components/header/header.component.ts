import { Component } from '@angular/core';
import { Auth } from '../../auth/auth';
import { RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-header',
  standalone:true,
  imports: [RouterLink, AsyncPipe, ButtonComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent{

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
