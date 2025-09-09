import { Component, OnInit, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import { API } from '../../service/api';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { Card } from "../card/card";
import { FormControl, FormsModule, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SearchBar } from '../search-bar/search-bar';
import { Form } from '../form/form';
import { EmptyState } from '../empty-state/empty-state';

@Component({
  selector: 'app-posts',
  standalone:true,
  imports: [CommonModule, Form, Card, EmptyState, FormsModule, MatCardModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatIconModule, SearchBar],
  templateUrl: './posts.html',
  styleUrls: ['./posts.css']
})
export class Posts implements OnInit {

posts: any[] = [];
totalPosts!:number;

addUserForm!: FormGroup;

displayedPosts: any[] = [];
searchTerm: string = '';

showForm:boolean=false;

  comments: { [postId: number]: any[] } = {}; // mappa: postId -> array di commenti
  showComments: { [postId: number]: boolean } = {};
  typeText:string='post'
  messageText:string='commento'

postFields = [
  { name: 'titolo', label: 'Title', type: 'text', validators: [Validators.required] },
  { name: 'testo', label: 'Body', type: 'textarea', validators: [Validators.required] },
  { name: 'user_id', label: 'User Id', type: 'number', validators: [Validators.required] },
];

@ViewChild(Form) formComponent!: Form;

  constructor(private api: API) {}

    ngOnInit(): void {
  this.api.getPosts().subscribe((data: any) => {
  console.log(data);
  this.posts=data;
  this.displayedPosts = data;
  this.totalPosts=this.posts.length;
  });
  }
  
toggleComments(postId: number) {
  if (this.showComments[postId]) {
    // Se già visibili, nascondi
    this.showComments[postId] = false;
  } else {
    // Se non visibili, carica i commenti e mostra
    this.api.getComments(postId).subscribe((data: any) => {
      this.comments[postId] = data;
      this.showComments[postId] = true;
    });
  }
}



 onSubmit(formValue: any) {
    const newPost = {
      user_id: formValue.user_id,
      title: formValue.titolo,
      body: formValue.testo,
    };
        this.api.createPost(newPost).subscribe({
      next: (createdPost) => {
        console.log(createdPost);
       this.displayedPosts.unshift(createdPost); 

        // reset e chiusura form
        this.formComponent.resetForm();
        this.showForm = false;
      },
      error: (err) => {
        console.error('Errore creazione utente:', err);
      }
    });
  }

  toggleForm() {
    this.showForm = !this.showForm;
  }


  onSearchPost() {
 if (!this.searchTerm.trim()) {
      this.displayedPosts = [...this.posts]; // reset se campo vuoto
    return;
 }
      this.displayedPosts = this.posts.filter((post: any) =>
        post.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        post.body.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
      console.log("Termine cercato:", this.searchTerm);
      console.log("Risultati:", this.displayedPosts);
}

}
