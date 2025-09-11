import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { ButtonComponent } from "../button/button.component";

@Component({
  selector: 'app-homepage',
  standalone:true,
  imports: [MatButtonModule, CommonModule, HeaderComponent, ButtonComponent],
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit{

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
