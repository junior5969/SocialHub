import { Component } from '@angular/core';
import { Auth } from '../../auth/auth';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone:true,
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class Header {

    tokenUrl='https://gorest.co.in/consumer/login';
    
    constructor(private auth: Auth, private router: Router) {}


    onCreateToken() {
   window.open(this.tokenUrl, "_blank");
   }

    logout() {
    this.auth.logout();  // chiama la funzione che hai scritto
  }
}
