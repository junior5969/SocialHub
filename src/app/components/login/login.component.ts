import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Auth } from '../../auth/auth';
import { HeaderComponent } from '../header/header.component';
import { ButtonComponent } from "../button/button.component";

@Component({
  selector: 'app-login',
  standalone:true,
  imports: [HeaderComponent, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, FormsModule, ReactiveFormsModule, ButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  token:string='';

  constructor(private auth:Auth, private router: Router) {}

  ngOnInit(): void {

    this.loginForm= new FormGroup ({
      token: new FormControl (null, Validators.required),
    })
    
  }

  onSubmit() {
    const token = this.loginForm.value.token;
    if (token) {
      this.auth.setToken(token);
      this.router.navigate(['/users']); // redirect dopo login
  }
}

}
