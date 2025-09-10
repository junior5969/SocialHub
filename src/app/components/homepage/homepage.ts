import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Header } from '../header/header';
import { Button } from "../button/button";

@Component({
  selector: 'app-homepage',
  standalone:true,
  imports: [MatButtonModule, CommonModule, Header, Button],
  templateUrl: './homepage.html',
  styleUrls: ['./homepage.css']
})
export class Homepage implements OnInit{

tokenUrl='https://gorest.co.in/consumer/login';

constructor(private router:Router) {} //servizio di Angular che gestisce la navigazione effettiva tra le rotte.

ngOnInit(): void {
  
}

onLogin() {
   this.router.navigate(['/login']);
}


onCreateToken() {
   window.open(this.tokenUrl, "_blank");
}

}
