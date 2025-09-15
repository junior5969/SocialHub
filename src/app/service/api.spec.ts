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
        provideHttpClient(),          
        provideHttpClientTesting()    
      ]
    });
    service = TestBed.inject(API);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('dovrebbe recuperare gli utenti', (done) => {
    const mockUsers: UserInterface[] = [
      { id: 1, name: 'Alice', email: 'alice@example.com', gender: 'female', status: 'active' },
      { id: 2, name: 'Bob', email: 'bob@example.com', gender: 'male', status: 'active' }
    ];

    service.getUsers().subscribe(users => {
      expect(users).toEqual(mockUsers);
      done();
    });

    const req = httpMock.expectOne(`${service['baseUrl']}/users?page=1&per_page=20`);
    req.flush(mockUsers);
  });

  it('dovrebbe non recuperare tutti gli utenti', (done) => {
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

  it('dovrebbe recuperare i post di un utente', (done) => {
    const mockPosts: PostInterface[] = [
      { id: 1, user_id: 1, title: 'Post 1', body: 'Body 1' },
      { id: 2, user_id: 1, title: 'Post 2', body: 'Body 2' }
    ];

    service.getUserPosts(1).subscribe(posts => {
      expect(posts).toEqual(mockPosts);
      done();
    });

    const req = httpMock.expectOne(`${service['baseUrl']}/users/1/posts`);
    req.flush(mockPosts);
  });

  it('dovrebbe non recuperare i post di un utente', (done) => {
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

  it('dovrebbe recuperare un singolo utente', (done) => {
    const mockUser: UserInterface = { id: 1, name: 'Alice', email: 'alice@example.com', gender: 'female', status: 'active' };

    service.getUserById(1).subscribe(user => {
      expect(user).toEqual(mockUser);
      done();
    });

    const req = httpMock.expectOne(`${service['baseUrl']}/users/1`);
    req.flush(mockUser);
  });

  it('dovrebbe non recuperare un singolo utente', (done) => {
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
