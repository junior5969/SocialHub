import { TestBed } from '@angular/core/testing';
import { API } from './api';
import { provideHttpClient, HttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { PostInterface } from '../models/post-interface';
import { UserInterface } from '../models/user-interface';


describe('API Service', () => {
  let service: API;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        API,
        provideHttpClient(),          // Serve _HttpClient
        provideHttpClientTesting()    // Serve HttpTestingController
      ]
    });
    service = TestBed.inject(API);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('dovrebbe recuperare tutti gli utenti - successo', (done) => {
    const dummyUsers: UserInterface[] = [
      { id: 1, name: 'Alice', email: 'alice@example.com', gender: 'female', status: 'active' },
      { id: 2, name: 'Bob', email: 'bob@example.com', gender: 'male', status: 'active' }
    ];

    service.getUsers().subscribe(users => {
      expect(users).toEqual(dummyUsers);
      done();
    });

    const req = httpMock.expectOne(`${service['baseUrl']}/users?page=1&per_page=20`);
    req.flush(dummyUsers);
  });

  it('dovrebbe recuperare tutti gli utenti - errore', (done) => {
    service.getUsers().subscribe({
      next: () => fail('should fail'),
      error: (err) => {
        expect(err.status).toBe(404);
        done();
      }
    });

    const req = httpMock.expectOne(`${service['baseUrl']}/users?page=1&per_page=20`);
    req.flush('Error', { status: 404, statusText: 'Not Found' });
  });

  it('dovrebbe recuperare i post di un utente - successo', (done) => {
    const dummyPosts: PostInterface[] = [
      { id: 1, user_id: 1, title: 'Post 1', body: 'Body 1' },
      { id: 2, user_id: 1, title: 'Post 2', body: 'Body 2' }
    ];

    service.getUserPosts(1).subscribe(posts => {
      expect(posts).toEqual(dummyPosts);
      done();
    });

    const req = httpMock.expectOne(`${service['baseUrl']}/users/1/posts`);
    req.flush(dummyPosts);
  });

  it('dovrebbe recuperare i post di un utente - errore', (done) => {
    service.getUserPosts(1).subscribe({
      next: () => fail('should fail'),
      error: (err) => {
        expect(err.status).toBe(500);
        done();
      }
    });

    const req = httpMock.expectOne(`${service['baseUrl']}/users/1/posts`);
    req.flush('Error', { status: 500, statusText: 'Server Error' });
  });

  it('dovrebbe recuperare un singolo utente - successo', (done) => {
    const dummyUser: UserInterface = { id: 1, name: 'Alice', email: 'alice@example.com', gender: 'female', status: 'active' };

    service.getUserById(1).subscribe(user => {
      expect(user).toEqual(dummyUser);
      done();
    });

    const req = httpMock.expectOne(`${service['baseUrl']}/users/1`);
    req.flush(dummyUser);
  });

  it('dovrebbe recuperare un singolo utente - errore', (done) => {
    service.getUserById(1).subscribe({
      next: () => fail('should fail'),
      error: (err) => {
        expect(err.status).toBe(404);
        done();
      }
    });

    const req = httpMock.expectOne(`${service['baseUrl']}/users/1`);
    req.flush('Not Found', { status: 404, statusText: 'Not Found' });
  });
});
