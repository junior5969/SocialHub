import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { API } from '../../service/api';
import { HttpClient } from '@angular/common/http';
import { User } from '../user/user';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { SearchBar } from '../search-bar/search-bar';
import { EmptyState } from '../empty-state/empty-state';
import { Form } from '../form/form';
import { Header } from '../header/header';
import { Button } from '../button/button';
import { UserInterface } from '../../models/user-interface';
import { NewUserInterface } from '../../models/new-user-interface';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    CommonModule,
    User,
    Header,
    Form,
    Button,
    FormsModule,
    EmptyState,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    MatIconModule,
    RouterLink,
    SearchBar,
  ],
  templateUrl: './users.html',
  styleUrls: ['./users.css'],
})
export class Users implements OnInit {
  users: UserInterface[] = [];
  totalUsers!: number;

  /*   addUserForm!: FormGroup; */

  displayedUsers: UserInterface[] = [];
  searchTerm: string = '';
  detailedUser?: UserInterface;
  showFormUser: boolean = false;

  typeText: string = 'utente';

  // campi da passare al FormComponent
  userFields = [
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      validators: [Validators.required],
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      validators: [Validators.required, Validators.email],
    },
    {
      name: 'gender',
      label: 'Gender',
      type: 'select',
      options: ['male', 'female'],
      validators: [Validators.required],
    },
    {
      name: 'status',
      label: 'Status',
      type: 'select',
      options: ['active', 'inactive'],
      validators: [Validators.required],
    },
  ];

  @ViewChild(Form) formComponent!: Form;

  private destroy$ = new Subject<void>();

  constructor(private api: API, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.api
      .getUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.users = data;
          this.displayedUsers = data;
          this.totalUsers = data.length;
          console.log('Utenti caricati:', data);
        },
        error: (err) => console.error('Errore caricamento utenti:', err),
        complete: () => console.log('getUsers completato'),
      });
  }

  onSubmit(formValue: {
    name: string;
    email: string;
    gender: 'male' | 'female';
    status: 'active' | 'inactive';
  }) {
    const newUser: NewUserInterface = {
      name: formValue.name,
      email: formValue.email,
      gender: formValue.gender,
      status: formValue.status,
    };

    // chiama l'API per creare l'utente
    this.api.createUser(newUser).subscribe({
      next: (createdUser) => {
        console.log('Utente creato:', createdUser);
        this.displayedUsers.unshift(createdUser); // aggiorno lista visualizzata

        // reset e chiusura form
        this.formComponent.resetForm();
        this.showFormUser = false;

        // Snackbar di successo
        this.snackBar.open('Utente creato con successo!', 'Chiudi', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
      },

      error: (err) => {
        console.error('Errore creazione utente:', err);
        // Snackbar di errore
        this.snackBar.open(
          `Errore durante la creazione dell'utente!`,
          'Chiudi',
          {
            duration: 3000,
          }
        );
      },
      complete: () => console.log('createUser completato'),
    });
  }

  onSearchUser() {
    if (!this.searchTerm.trim()) {
      this.displayedUsers = [...this.users]; // reset se campo vuoto
      return;
    }
    this.displayedUsers = this.users.filter(
      (user: UserInterface) =>
        user.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    console.log('Termine cercato:', this.searchTerm);
    console.log('Risultati:', this.displayedUsers);
  }

  onDeleteUser(idUser: number) {
    this.api.deleteUser(idUser).subscribe({
      next: () => {
        console.log('Utente eliminato:', idUser);

        // Aggiorno lista completa
        this.users = this.users.filter((user) => user.id !== idUser);

        // Snackbar di successo
        this.snackBar.open('Utente eliminato con successo!', 'Chiudi', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });

        // Aggiorno lista filtrata
        if (this.searchTerm.trim()) {
          this.onSearchUser();
        } else {
          this.displayedUsers = this.users;
        }
      },
      error: (err) => {
        console.error('Errore eliminazione utente:', err);

        this.snackBar.open(`Errore durante l'eliminazione!`, 'Chiudi', {
          duration: 3000,
        });
      },
      complete: () => console.log('deleteUser completato'),
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
