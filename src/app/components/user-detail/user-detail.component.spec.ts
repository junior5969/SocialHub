/* import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { provideRouter } from '@angular/router';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { UserDetailComponent } from './user-detail.component';
import { API } from '../../service/api';
import { PostInterface } from '../../models/post-interface';
import { CommentInterface } from '../../models/comment-interface';
import { Component } from '@angular/core';
import { UserInterface } from '../../models/user-interface';

// Stub del form con resetForm
@Component({
  selector: 'app-form',
  standalone: true,
  template: `<form></form>`
})
class TestFormComponent {
  resetForm() {}
}

describe('UserDetailComponent', () => {
  let component: UserDetailComponent;
  let fixture: ComponentFixture<UserDetailComponent>;
  let apiSpy: jasmine.SpyObj<API>;

  beforeEach(async () => {
    apiSpy = jasmine.createSpyObj('API', ['getUserById', 'getUserPosts', 'getComments', 'createComment']);

    await TestBed.configureTestingModule({
      imports: [UserDetailComponent, TestFormComponent, MatSnackBarModule],
      providers: [
        { provide: API, useValue: apiSpy },
        provideRouter([])  // 👈 Necessario per ActivatedRoute
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UserDetailComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load user and posts', () => {
    const mockUser: UserInterface ={ id:1, name: 'Alice', email: 'alice@test.com', gender:'female', status:'active' };
    const mockPosts: PostInterface[] = [{ id: 1, user_id: 1, title: 'Post 1', body: 'Body' }];

    apiSpy.getUserById.and.returnValue(of(mockUser));
    apiSpy.getUserPosts.and.returnValue(of(mockPosts));

    component.ngOnInit();

    expect(apiSpy.getUserById).toHaveBeenCalled();
    expect(apiSpy.getUserPosts).toHaveBeenCalled();
  });

  it('should toggle comments and create comment', () => {
    const postId = 1;
    const mockComments: CommentInterface[] = [{ id: 1, post_id: 1, name: 'Bob', email: 'bob@test.com', body: 'Hello' }];
    apiSpy.getComments.and.returnValue(of(mockComments));
    apiSpy.createComment.and.returnValue(of(mockComments[0]));

    // Toggle comments first time: carica commenti
    component.toggleComments(postId);
    expect(apiSpy.getComments).toHaveBeenCalledWith(postId);

    // Submit comment
    component.onSubmit(postId, { name: 'Bob', email: 'bob@test.com', body: 'Hello' });
    expect(apiSpy.createComment).toHaveBeenCalledWith(postId, { name: 'Bob', email: 'bob@test.com', body: 'Hello' });
  });
});
 */