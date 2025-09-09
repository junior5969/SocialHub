import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Auth } from '../../auth/auth';
import { Header } from '../header/header';

@Component({
  selector: 'app-login',
  standalone:true,
  imports: [Header, MatFormFieldModule, MatInputModule, MatSelectModule,MatButtonModule, FormsModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login implements OnInit {

  loginForm!: FormGroup;

  isLogged:boolean=false;

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
