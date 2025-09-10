import { Injectable , inject} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'
import { Auth } from '../auth/auth';
import { UserInterface } from '../models/user-interface';
import { PostInterface } from '../models/post-interface';
import {CommentInterface} from '../models/comment-interface';
import { NewUserInterface } from '../models/new-user-interface';
import { NewCommentInterface } from '../models/new-comment-interface';
import { NewPostInterface } from '../models/new-post-interface';

@Injectable({
  providedIn: 'root'
})
export class API {

  private http = inject(HttpClient);

// Endpoint base
  private baseUrl = 'https://gorest.co.in/public/v2';
  

//Per Utenti
getUsers(): Observable<UserInterface[]> {
return this.http.get<UserInterface[]>(`${this.baseUrl}/users?page=1&per_page=20`);
}

getUserById(id:number): Observable<UserInterface>  {
  return this.http.get<UserInterface> (`${this.baseUrl}/users/${id}`);
}

createUser(body:NewUserInterface): Observable<UserInterface> {
return this.http.post<UserInterface> (`${this.baseUrl}/users`, body);
}

deleteUser(id:number): Observable<UserInterface> {
return this.http.delete<UserInterface> (`${this.baseUrl}/users/${id}`);
}

getUserDetails(id:number): Observable<UserInterface> {
return this.http.get<UserInterface> (`${this.baseUrl}/users/${id}`);
}

//Per post
getUserPosts(id:number): Observable<PostInterface[]> {
  return this.http.get<PostInterface[]> (`${this.baseUrl}/users/${id}/posts`);
}

getPosts(): Observable<PostInterface[]> {
  return this.http.get<PostInterface[]>(`${this.baseUrl}/posts`);
}

createPost(body:NewPostInterface): Observable<PostInterface> {
return this.http.post<PostInterface>(`${this.baseUrl}/posts`, body);
}

//Per commenti
getComments(postId:number): Observable<CommentInterface[]> {
return this.http.get<CommentInterface[]>(`${this.baseUrl}/posts/${postId}/comments`);
}

createComment(postId:number, body:NewCommentInterface): Observable<CommentInterface> {
return this.http.post<CommentInterface>(`${this.baseUrl}/posts/${postId}/comments`, body);
}
}
