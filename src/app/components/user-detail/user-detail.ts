import { Component, OnInit , ViewChild} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { API } from '../../service/api';
import { Card } from "../card/card";
import { EmptyState } from '../empty-state/empty-state';
import { MatCardModule } from '@angular/material/card';
import {FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { Form } from "../form/form";
import { Button } from '../button/button';
import { UserInterface } from '../../models/user-interface';
import { PostInterface } from '../../models/post-interface';
import {CommentInterface} from '../../models/comment-interface';
import { NewCommentInterface } from '../../models/new-comment-interface';


@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [Card, EmptyState, MatCardModule, MatIcon, Form, FormsModule, ReactiveFormsModule, Button],
  templateUrl: './user-detail.html',
  styleUrls: ['./user-detail.css']
})
export class UserDetail implements OnInit{

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

@ViewChild(Form) formComponent!: Form;

private destroy$ = new Subject<void>();

  constructor(private route: ActivatedRoute, private api: API) {}

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
      },
      error: err => console.error('Errore creazione commento:', err),
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
