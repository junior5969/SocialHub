/* import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { PostsComponent } from './posts.component'; 
import { MatSnackBar } from '@angular/material/snack-bar';
import { of, throwError } from 'rxjs';
import { API } from '../../service/api';

describe('PostsComponent', () => {
  let component: PostsComponent;
  let fixture: ComponentFixture<PostsComponent>;
  let apiMock: any;
  let snackBarMock: any;

  beforeEach(async () => {
    // Mock dei servizi
    apiMock = {
      getPosts: jasmine.createSpy('getPosts').and.returnValue(of([{ id: 1, title: 'Test Post', body: 'Content', user_id: 1 }])),
      createPost: jasmine.createSpy('createPost').and.returnValue(of({ id: 99, title: 'Nuovo Post', body: 'Body', user_id: 1 })),
      createComment: jasmine.createSpy('createComment').and.returnValue(of({ id: 100, name: 'Luca', email: 'luca@test.com', body: 'ciao commento' })),
      searchPosts: jasmine.createSpy('searchPosts').and.returnValue(of([{ id: 1, title: 'Test Post', body: 'Content', user_id: 1 }]))
    };

    snackBarMock = {
      open: jasmine.createSpy('open')
    };

    await TestBed.configureTestingModule({
      imports: [PostsComponent], // ✅ componente standalone va in imports
      providers: [
        { provide: API, useValue: apiMock },
        { provide: MatSnackBar, useValue: snackBarMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load posts on init', () => {
    component.ngOnInit();
    expect(apiMock.getPosts).toHaveBeenCalled();
    expect(component.posts.length).toBe(1);
  });

  it('should add a new post', fakeAsync(() => {
    const post = { title: 'Nuovo Post', body: 'Body' };
    component.onSubmitPost({ user_id: 1, title: 'Nuovo Post', body: 'Body' });
    tick();
    expect(apiMock.createPost).toHaveBeenCalledWith(post);
    expect(snackBarMock.open).toHaveBeenCalledWith('Post creato con successo!', 'Chiudi', jasmine.any(Object));
  }));

  it('should add a new comment', fakeAsync(() => {
    const comment = { postId: 1, name: 'Luca', email: 'luca@test.com', body: 'ciao commento' };
    component.onSubmitComment(1, { name: 'Luca', email: 'luca@test.com', body: 'ciao commento' });
    tick();
    expect(apiMock.createComment).toHaveBeenCalledWith(comment);
    expect(snackBarMock.open).toHaveBeenCalledWith('Commento creato con successo!', 'Chiudi', jasmine.any(Object));
  }));

  it('should handle search', fakeAsync(() => {
        component.posts = [
      { id: 1, user_id: 1, title: 'Test Post', body: 'Content' },
      { id: 2, user_id: 2, title: 'Other', body: 'Other content' }
    ];
    tick();
    expect(apiMock.searchPosts).toHaveBeenCalledWith('test');
    expect(component.posts.length).toBe(1);
  }));

  it('should toggle forms', () => {
    component.showForm = false;
    component.toggleForm();
    expect(component.showForm).toBeTrue();
    component.toggleForm();
    expect(component.showForm).toBeFalse();
  });

  it('should toggle comments', () => {
    component.showComments[1] = false;
    component.toggleComments(1);
    expect(component.showComments[1]).toBeTrue();
    component.toggleComments(1);
    expect(component.showComments[1]).toBeFalse();
  });
});
 */