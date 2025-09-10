import { Component, OnInit , ViewChild} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { API } from '../../service/api';
import { HttpClient } from '@angular/common/http';
import { User } from "../user/user";
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { SearchBar } from '../search-bar/search-bar';
import { EmptyState } from '../empty-state/empty-state';
import { Form } from '../form/form';
import { Header } from '../header/header';
import { Button } from '../button/button';


@Component({
  selector: 'app-users',
  standalone:true,
  imports: [CommonModule, User, Header, Form, Button, FormsModule, EmptyState, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatIconModule, RouterLink, SearchBar],
  templateUrl: './users.html',
  styleUrls: ['./users.css']
})
export class Users implements OnInit{
  users: any[] = [];
  totalUsers!: number;

/*   addUserForm!: FormGroup; */

  displayedUsers: any[] = [];
  searchTerm: string = '';
  detailedUser: any;
  showFormUser: boolean = false;

  typeText:string='utente';


    // campi da passare al FormComponent
userFields = [
  { name: 'nome', label: 'Name', type: 'text', validators: [Validators.required] },
  { name: 'email', label: 'Email', type: 'email', validators: [Validators.required, Validators.email] },
  { name: 'genere', label: 'Gender', type: 'text', validators: [] },
  { name: 'stato', label: 'Status', type: 'text', validators: [] }
];

@ViewChild(Form) formComponent!: Form;

private destroy$ = new Subject<void>();

  constructor(private api: API) {}

  ngOnInit(): void {
    this.api.getUsers()
          .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: data => {
          this.users = data;
          this.displayedUsers = data;
          this.totalUsers = data.length;
          console.log('Utenti caricati:', data);
        },
        error: err => console.error('Errore caricamento utenti:', err),
        complete: () => console.log('getUsers completato')
      });
  }


 onSubmit(formValue: any) {
    const newUser = {
      name: formValue.nome,
      email: formValue.email,
      gender: formValue.genere,
      status: formValue.stato,
    };

    // chiama l'API per creare l'utente
    this.api.createUser(newUser).subscribe({
      next: (createdUser) => {
      console.log('Utente creato:', createdUser);
       this.displayedUsers.unshift(createdUser); // aggiorno lista visualizzata

        // reset e chiusura form
        this.formComponent.resetForm();
        this.showFormUser = false;
      },
      error: err => console.error('Errore creazione utente:', err),
      complete: () => console.log('createUser completato')
    });
  }



  onSearchUser() {
 if (!this.searchTerm.trim()) {
      this.displayedUsers = [...this.users]; // reset se campo vuoto
    return;
 }
      this.displayedUsers = this.users.filter((user: any) =>
        user.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
      console.log("Termine cercato:", this.searchTerm);
      console.log("Risultati:", this.displayedUsers);
}


  
  onDeleteUser(idUser: number) {
    this.api.deleteUser(idUser).subscribe({
      next: () => {
        console.log('Utente eliminato:', idUser);

      // Aggiorno lista completa
      this.users = this.users.filter(user => user.id !== idUser);

      // Aggiorno lista filtrata
      if (this.searchTerm.trim()) {
        this.onSearchUser();
      } else {
          this.displayedUsers = this.users;
        }
      },
      error: err => console.error('Errore eliminazione utente:', err),
      complete: () => console.log('deleteUser completato')
    });
  }

  toggleForm() {
    this.showFormUser = !this.showFormUser;
  }

  
  ngOnDestroy(): void {
  this.destroy$.next();
  this.destroy$.complete();
}
}
