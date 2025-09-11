import { Component, OnInit , ViewChild} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { API } from '../../service/api';
import { CardComponent } from "../card/card.component";
import { EmptyStateComponent } from '../empty-state/empty-state.component';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import {FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { FormComponent } from "../form/form.component";
import { ButtonComponent } from '../button/button.component';
import { UserInterface } from '../../models/user-interface';
import { PostInterface } from '../../models/post-interface';
import {CommentInterface} from '../../models/comment-interface';
import { NewCommentInterface } from '../../models/new-comment-interface';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [CardComponent, EmptyStateComponent, HeaderComponent, MatCardModule, MatIcon, FormComponent, FormsModule, ReactiveFormsModule, ButtonComponent, MatSnackBarModule],
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit{

  user!: UserInterface;
  posts: PostInterface[] = [];
  comments: { [postId: number]: CommentInterface[] } = {}; // mappa: postId -> array di commenti
  showComments: { [postId: number]: boolean } = {};
  typeText:string='post'
  messageText:string='commento'
  displayedComments: CommentInterface[] = [];
  postId!:number;
 
  showFormPost: { [postId: number]: boolean } = {};

  commentsFields = [
  { name: 'name', label: 'Nome', type: 'text', validators: [Validators.required] },
  { name: 'email', label: 'Email', type: 'email', validators: [Validators.required, Validators.email] },
  { name: 'body', label: 'Commento', type: 'textarea', validators: [Validators.required] },
];

@ViewChild(FormComponent) formComponent!: FormComponent;

private destroy$ = new Subject<void>();

  constructor(private route: ActivatedRoute, private api: API, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    // carico utente
    this.api.getUserById(id)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
        next: data => { this.user = data; },
        error: err => console.error('Errore caricamento utente:', err),
        complete: () => console.log('getUserById completato')
      });


    // carico post
    this.api.getUserPosts(id)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
        next: data => { 
          this.posts = data;
          console.log('Post utente:', data);
        },
        error: err => console.error('Errore caricamento post utente:', err),
        complete: () => console.log('getUserPosts completato')
      });
  }


  toggleComments(postId: number) {
    if (!this.comments[postId]) {
      this.api.getComments(postId)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: data => {
            this.comments[postId] = data;
            this.showComments[postId] = true;
          },
          error: err => console.error('Errore caricamento commenti:', err),
          complete: () => console.log(`Commenti post ${postId} caricati`)
        });
    } else {
      this.showComments[postId] = !this.showComments[postId];
    }
  }

   onSubmit(postId:number,formValue: { name: string; email: string; body: string }) {
    const newComment: NewCommentInterface = {
    name: formValue.name,
    email: formValue.email,
    body: formValue.body,
  };
    this.api.createComment(postId, newComment).subscribe({
      next: createdComment => {
        if (!this.comments[postId]) this.comments[postId] = [];
        this.comments[postId].push(createdComment);
        this.showComments[postId] = true;
        this.formComponent.resetForm();
        this.showFormPost[postId] = false;
     
                // Snackbar di successo
        this.snackBar.open('Commento creato con successo!', 'Chiudi', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
      },

      error: err => {
        console.error('Errore creazione commento:', err),
                // Snackbar di errore
        this.snackBar.open(
          "Errore durante la creazione del commento!",
          'Chiudi',
          {
            duration: 3000,
          }
        );
      },
      complete: () => console.log(`createComment post ${postId} completato`)
    });
  }

  
  toggleForm(postId: number) {
  this.showFormPost[postId] = !this.showFormPost[postId];
}


ngOnDestroy(): void {
  this.destroy$.next();
  this.destroy$.complete();
}
}
