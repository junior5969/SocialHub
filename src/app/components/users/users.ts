import { Component, OnInit , ViewChild} from '@angular/core';
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


@Component({
  selector: 'app-users',
  standalone:true,
  imports: [CommonModule, User, Form, FormsModule, EmptyState, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatIconModule, RouterLink, SearchBar],
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

  constructor(private api: API) {}

  ngOnInit(): void {
    this.api.getUsers().subscribe((data: any) => {
      this.users = data;
      this.displayedUsers = data; // inizializzo con tutti gli utenti
      console.log(data);
      this.totalUsers=this.displayedUsers.length;
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
        console.log(createdUser);
       this.displayedUsers.unshift(createdUser); // aggiorno lista visualizzata

        // reset e chiusura form
        this.formComponent.resetForm();
        this.showFormUser = false;
      },
      error: (err) => {
        console.error('Errore creazione utente:', err);
      }
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
    this.api.deleteUser(idUser).subscribe(() => {
      console.log("Utente eliminato:", idUser);

      // Aggiorno lista completa
      this.users = this.users.filter(user => user.id !== idUser);

      // Aggiorno lista filtrata
      if (this.searchTerm.trim()) {
        this.onSearchUser();
      } else {
        this.displayedUsers = this.users;
      }
    });
  }

  toggleForm() {
    this.showFormUser = !this.showFormUser;
  }

}