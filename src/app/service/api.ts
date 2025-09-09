import { Injectable , inject} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'
import { Auth } from '../auth/auth';


@Injectable({
  providedIn: 'root'
})
export class API {

  private http = inject(HttpClient);

// Endpoint base
  private baseUrl = 'https://gorest.co.in/public/v2';
  

//Per Utenti
getUsers(): Observable<any> {
return this.http.get(`${this.baseUrl}/users?page=1&per_page=20`);
}

getUserById(id:number): Observable<any> {
  return this.http.get(`${this.baseUrl}/users/${id}`);
}

createUser(body:{}): Observable<any> {
return this.http.post(`${this.baseUrl}/users`, body);
}

deleteUser(id:number): Observable<any> {
return this.http.delete(`${this.baseUrl}/users/${id}`);
}

getUserDetails(id:number): Observable<any> {
return this.http.get(`${this.baseUrl}/users/${id}`);
}

//Per post
getUserPosts(id:number): Observable<any> {
  return this.http.get(`${this.baseUrl}/users/${id}/posts`);
}

getPosts(): Observable<any> {
  return this.http.get(`${this.baseUrl}/posts`);
}

createPost(body:{}): Observable<any> {
return this.http.post(`${this.baseUrl}/posts`, body);
}

//Per commenti
getComments(postId:number): Observable<any> {
return this.http.get(`${this.baseUrl}/posts/${postId}/comments`);
}

createComment(postId:number, body:{}): Observable<any> {
return this.http.post(`${this.baseUrl}/posts/${postId}/comments`, body);
}
}
