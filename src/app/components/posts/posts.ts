import { Component, OnInit, ViewChild} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { API } from '../../service/api';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { Card } from "../card/card";
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { FormControl, FormsModule, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SearchBar } from '../search-bar/search-bar';
import { Form } from '../form/form';
import { EmptyState } from '../empty-state/empty-state';
import { Button } from '../button/button';
import { PostInterface } from '../../models/post-interface';
import { CommentInterface } from '../../models/comment-interface';
import { NewPostInterface } from '../../models/new-post-interface';
import { NewCommentInterface } from '../../models/new-comment-interface';

@Component({
  selector: 'app-posts',
  standalone:true,
  imports: [CommonModule, Form, Button, Card, EmptyState, FormsModule, MatCardModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatIconModule, SearchBar, MatSnackBarModule],
  templateUrl: './posts.html',
  styleUrls: ['./posts.css']
})
export class Posts implements OnInit {

posts: PostInterface[] = [];
totalPosts!:number;

addUserForm!: FormGroup;

displayedPosts: PostInterface[] = [];
searchTerm: string = '';

postId!:number;

  comments: { [postId: number]: CommentInterface[] } = {}; // mappa: postId -> array di commenti
  showComments: { [postId: number]: boolean } = {};
  typeText:string='post'
  messageText:string='commento'

showForm: boolean = false; // form globale post
showFormComment: { [postId: number]: boolean } = {}; // form commenti per post

userId : number [] =[];


postFields = [
  { name: 'title', label: 'Title', type: 'text', validators: [Validators.required] },
  { name: 'body', label: 'Body', type: 'textarea', validators: [Validators.required] },
  { name: 'user_id', label: 'User Id', type: 'select', validators: [Validators.required] },
];

  commentsFields = [
  { name: 'name', label: 'Nome', type: 'text', validators: [Validators.required] },
  { name: 'email', label: 'Email', type: 'email', validators: [Validators.required, Validators.email] },
  { name: 'body', label: 'Commento', type: 'textarea', validators: [Validators.required] },
];

@ViewChild(Form) formComponent!: Form;

private destroy$ = new Subject<void>();

  constructor(private api: API, private snackBar: MatSnackBar) {}

    ngOnInit(): void {
  this.api.getPosts()
  .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: data => {
        console.log(data);

        this.userId = [...new Set(data.map(post => post.user_id))];
        console.log("userId totali:", this.userId);

              // aggiornamento dinamico dell'opzione della select
     this.postFields = this.postFields.map(field => {
  if (field.name === 'user_id') {
    return { ...field, options: this.userId.map(id => id.toString()) };
  }
  return field;
});
    
        this.posts = data;
        this.displayedPosts = data;
        this.totalPosts = this.posts.length;
      },
      error: err => console.error('Errore caricamento post:', err),
      complete: () => console.log('Posts caricati')
    });
}
  
toggleComments(postId: number) {
  if (this.showComments[postId]) {
    // Se già visibili, nascondi
    this.showComments[postId] = false;
  } else {
    // Se non visibili, carica i commenti e mostra
    this.api.getComments(postId)      
    .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: data => {
          this.comments[postId] = data;
          this.showComments[postId] = true;
        },
        error: err => console.error('Errore caricamento commenti:', err),
        complete: () => console.log('Commenti caricati')
      });
  }
}

onSubmitPost(formValue: { user_id: string; title: string; body: string }) {
  const newPost: NewPostInterface = {
    user_id: Number(formValue.user_id),
    title: formValue.title,
    body: formValue.body,
  };

  this.api.createPost(newPost).subscribe({
    next: (createdPost) => {
      console.log('Post creato:', createdPost);
      this.displayedPosts.unshift(createdPost);

      // reset e chiusura form
      this.formComponent.resetForm();
      this.showForm = false;
                   // Snackbar di successo
        this.snackBar.open('Post creato con successo!', 'Chiudi', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
      },

    error: err =>{
       console.error('Errore creazione post:', err),
                   // Snackbar di errore
        this.snackBar.open(
          "Errore durante la creazione del post!",
          'Chiudi',
          {
            duration: 3000,
          }
        );
      },
    complete: () => console.log('createPost completato')
  });
}

onSubmitComment(postId: number, formValue: { name: string; email: string; body: string }) {
  const newComment: NewCommentInterface = {
    name: formValue.name,
    email: formValue.email,
    body: formValue.body,
  };

  this.api.createComment(postId, newComment).subscribe({
    next: (createdComment) => {
      console.log(`Commento creato per post ${postId}:`, createdComment);

      if (!this.comments[postId]) {
        this.comments[postId] = [];
      }
      this.comments[postId].push(createdComment);

      // reset form e chiudi form solo di quel post
      this.formComponent.resetForm();
      this.showFormComment[postId] = false;
      this.showComments[postId] = true;
             // Snackbar di successo
        this.snackBar.open('Commento creato con successo!', 'Chiudi', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
      },
    error: err => {
      console.error(`Errore creazione commento per post ${postId}:`, err),
        // Snackbar di errore
        this.snackBar.open(
          "Errore durante la creazione del commento!",
          'Chiudi',
          {
            duration: 3000,
          }
        );
      },
      complete: () => console.log('createComment completato')
  });
}

  toggleForm() {
    this.showForm = !this.showForm;
  }

  toggleFormComment(postId: number) {
  this.showFormComment[postId] = !this.showFormComment[postId];
}

  onSearchPost() {
 if (!this.searchTerm.trim()) {
      this.displayedPosts = [...this.posts]; // reset se campo vuoto
    return;
 }
      this.displayedPosts = this.posts.filter((post: PostInterface) =>
        post.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        post.body.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
      console.log("Termine cercato:", this.searchTerm);
      console.log("Risultati:", this.displayedPosts);
}


ngOnDestroy(): void {
  this.destroy$.next();
  this.destroy$.complete();
}
}
